"use client";
import Link from "next/link";
import Card from "../common/ui/Card";

export default function WelcomeCard() {
  return (
    /* 'hidden' -> sakriveno na mobitelu i svemu do 1024px
       'lg:block' -> pojavljuje se tek kad je ekran širi od 1024px
    */
    <div className="hidden lg:block">
      <Card>
        <div className="flex flex-col gap-4 p-8 items-start text-left">
          
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Dobrodošao 👋
          </h1>

          <p className="text-base text-gray-600 max-w-[500px]">
            Pronađi sportske aktivnosti u svojoj blizini i pridruži se zajednici.
          </p>

          <Link 
            href="/termini" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200"
          >
            Pogledaj termine
          </Link>
        </div>
      </Card>
    </div>
  );
}