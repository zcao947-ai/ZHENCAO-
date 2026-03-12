import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font-display text-[8rem] font-bold leading-none text-gradient-gold md:text-[12rem]">
        404
      </h1>
      <p className="mt-4 font-display text-2xl text-white/60 md:text-3xl">
        Trang không tồn tại
      </p>
      <p className="mt-4 max-w-md text-center text-white/40">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <div className="mt-10">
        <Button href="/" variant="outline" size="lg">
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}
