"use client"

import {  useState } from 'react';

export default function Home() {
  return (
    <div className="card">
      <img src="https://media.licdn.com/dms/image/v2/D5603AQHXcXkiWSWtpQ/profile-displayphoto-shrink_200_200/B56Zety6_WHEAg-/0/1750967499454?e=2147483647&v=beta&t=u-8fRX35D4vl2h5F6-W5qv4bxu7Z426m528f8wzVKLI" />
      <h1 className="name">Sarah Dole</h1>
      <p className="fornt">Front End Engineer @ Microsoft</p>
      <div classNmae="trun">
        I turn coffe into bugs which are fixed by someone else. Sertifiend stack
        Overflow and Chat GPT develorper
      </div>
      <button class="contact">contact Me</button>
    </div>
  );
}
