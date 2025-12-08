import { BusFront, Instagram, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-(--color-primary) pt-10 mt-20">
      <div className="border-b border-b-[white]/20  flex justify-between flex-wrap pb-20 px-20">
        <div className="w-[33%]">
          <div className="flex items-center gap-2">
            <span className="p-3 bg-(--color-accent) rounded-xl">
              <BusFront size={30} />
            </span>
            <span className="text-white">
              <h5 className="uppercase font-semibold leading-4">Bus pass</h5>
              <p className="uppercase text-[.8rem]">& transport</p>
            </span>
          </div>
          <p className="text-white w-[60%] mt-5">
            Easily apply and manage your bus pass online with secure
            verification.
          </p>
        </div>
        <div className="w-[33%]">
          <h1 className="text-white font-semibold text-2xl mb-5">
            Quick Links
          </h1>
          <div className="flex flex-col text-white gap-2">
            <Link href="/apply-pass">Apply for Bus Pass</Link>
            <Link href="/apply-pass">Track Application</Link>
            <Link href="/download-pass">Download Pass</Link>
            <Link href="/help">Help & Support</Link>
          </div>
        </div>
        <div className="w-[33%]">
          <h1 className="text-white font-semibold text-2xl mb-5">
            Contact Info
          </h1>
          <div className="flex flex-col text-white gap-2">
            <span className="flex items-center gap-2">
              <Mail size={15} />
              <a href="/" className="text-[.9rem]">
                support@transport.gov.in
              </a>
            </span>
            <span className="flex items-center gap-2">
              <Phone size={15} />
              <a href="/" className="text-[.9rem]">
                +91 1234567890
              </a>
            </span>
            <div className="flex gap-6 mt-3">
              <span>
                <Twitter size={20} />
              </span>
              <span>
                <Instagram size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-white/60 text-center py-2">
        &copy; 2026 India Transport - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
