import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { SocialIcon } from 'react-social-icons'

function Footer() {
  return (
<section className="relative overflow-hidden py-10 bg-gray-900 text-gray-200 border border-t-2 border-gray-700 bottom-0">
    <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
            <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                <div className="flex h-full flex-col justify-between">
                    <div className="mb-4 inline-flex items-center">
                        <Logo width="200px" />
                    </div>
                    <div>
                        <p className="text-sm">
                            &copy; Copyright 2024. All Rights Reserved by @soummyaanon.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-7/12">
                <div className="flex flex-col items-start">
                    <h3 className="tracking-px mb-9 text-xs font-semibold uppercase">
                        Follow Me
                    </h3>
                    <ul className="flex space-x-4">
                        <li>
                            <SocialIcon url="https://x.com/Thesourya2000" className="text-base font-medium text-white-300 hover:text-gray-700" />
                        </li>
                        <li>
                            <SocialIcon url="https://github.com/soummyaanon" className="text-base font-medium text-white-300 hover:text-gray-700" />
                        </li>
                        <li>
                            <SocialIcon url="https://www.linkedin.com/in/soumyapandaofficial/" className="text-base font-medium text-white-300 hover:text-gray-700" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
    );
};

export default Footer