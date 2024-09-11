import VerifyModal from "@/components/VerifyModal";
import ClientForm from "@/components/forms/ClientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <VerifyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex-center">
            <Image
              src="/assets/icons/butterfly-logo-round.svg"
              alt="client"
              height={200}
              width={200}
            />
          </div>

          <ClientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Butterfly
            </p>
            <Link href="/?admin=true" className="text-blue-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
