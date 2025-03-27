import React from 'react';
import { IoLogoGithub } from "react-icons/io";

function Footer() {
    return (
        <footer className='mx-auto mt-4'>
            <a href="https://github.com/ayoub-aberbach" target="_blank" id="my_github" className='d-flex align-items-center jusstify-content-between gap-2'>
                <IoLogoGithub size={20} />
                <span>My Github</span>
            </a>
        </footer>
    )
}

export default Footer
