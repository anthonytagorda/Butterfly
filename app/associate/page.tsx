import Link from "next/link";
import Image from "next/image";
import React from "react";

const Associate = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/butterfly-logo-full.svg"
            height={32}
            width={162}
            alt="Logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Associate Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 🦋</h1>
          <p className="text-dark-700">Start the day with appointments</p>
        </section>
      </main>
    </div>
  );
};

export default Associate;
