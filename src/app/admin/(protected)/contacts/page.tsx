"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";
import type { Contact } from "@/types/database";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const supabase = createClient();

  const fetchContacts = async () => {
    const { data } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    setContacts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleRead = async (contact: Contact) => {
    await supabase.from("contacts").update({ is_read: !contact.is_read }).eq("id", contact.id);
    fetchContacts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa tin nhắn này?")) return;
    await supabase.from("contacts").delete().eq("id", id);
    if (selectedContact?.id === id) setSelectedContact(null);
    fetchContacts();
  };

  const viewContact = async (contact: Contact) => {
    setSelectedContact(contact);
    if (!contact.is_read) {
      await supabase.from("contacts").update({ is_read: true }).eq("id", contact.id);
      fetchContacts();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tin nhắn liên hệ</h1>

      {/* Detail modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Chi tiết tin nhắn</h2>
              <button onClick={() => setSelectedContact(null)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-400">Tên</div>
                <div>{selectedContact.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div>{selectedContact.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Loại</div>
                <div className="capitalize">{selectedContact.contact_type === "collaboration" ? "Hợp tác" : "Liên hệ chung"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Ngày gửi</div>
                <div>{formatDate(selectedContact.created_at)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Nội dung</div>
                <div className="bg-gray-800 rounded-lg p-4 mt-1 whitespace-pre-wrap">{selectedContact.message}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Đang tải...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Chưa có tin nhắn nào.</div>
      ) : (
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-gray-900 border rounded-xl p-4 cursor-pointer hover:border-gray-600 transition-colors ${
                contact.is_read ? "border-gray-800" : "border-[#C9A96E]/50"
              }`}
              onClick={() => viewContact(contact)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {!contact.is_read && <div className="w-2 h-2 rounded-full bg-[#C9A96E]" />}
                  <div>
                    <span className="font-semibold">{contact.name}</span>
                    <span className="text-gray-400 text-sm ml-2">{contact.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{formatDate(contact.created_at)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleRead(contact); }}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    {contact.is_read ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2 line-clamp-1">{contact.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
