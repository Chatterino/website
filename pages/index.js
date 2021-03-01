import Head from "next/head";
import styles from "../styles/Home.module.css";

import ChatProp from "../components/chatprop";

import {
  Apple,
  Discord,
  Download,
  FreeBSD,
  GitHub,
  LinkInformation,
  Message,
  Privacy,
  Tux,
  Windows,
} from "components/logos";

import { Carousel } from "react-responsive-carousel";
// import Carousel from "@brainhubeu/react-carousel";
// import {
//   CarouselProvider,
//   Slider,
//   Slide,
//   ButtonBack,
//   ButtonNext,
// } from "pure-react-carousel";

// import Slider from "react-slick";

const wiki = "https://wiki.chatterino.com";
const discord = "https://discord.gg/3vmJRwy";
const github = "https://github.com/chatterino/chatterino2";
const tip = "https://streamelements.com/fourtf/tip";

function Link({ href, children }) {
  return (
    <a href={href} class="underline text-blue-300 font-bold">
      {children}
    </a>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} class="py-3 px-4">
      {children}
    </a>
  );
}

function Button({ children, ...props }) {
  return (
    <button
      class={
        "text-white bg-blue-500 hover:bg-blue-400 m-3 py-2 px-4 rounded cursor-pointer focus:ring-4 ring-blue-300 ring-opacity-30 " +
        props.class
      }
    >
      {children}
    </button>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chatterino</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} class="text-white">
        <Nav />

        <div class="p-8"></div>

        <FirstHero />
        <Features />
        <Features2 />
        <Testimonials />
        <Downloads />
        <Miscellaneous />
        <Footer />
      </main>
    </div>
  );
}

function Section({ children, ...other }) {
  return (
    <div {...other}>
      <div class="grid">
        <div class="max-w-screen-xl place-self-center">{children}</div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav
      class="bg-gray-800 fixed w-full flex items-center space-around md:px-12"
      style={{ zIndex: 2 }}
    >
      <div
        class="max-w-screen-xl w-full flex justify-between"
        style={{ margin: "0 auto" }}
      >
        {/* logo */}
        <a href="/">
          <div class="flex items-center text-white p-6 space-x-4">
            <img src="logo.png" class="w-8 h-8" />
            <div>Chatterino</div>
          </div>
        </a>

        {/* expand button */}
        {/* <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg
                class="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div> */}

        {/* <div class="text-gray-300 w-full block md:flex md:items-center md:w-auto"> */}
        <div class="flex items-center px-3 md:px-6">
          <div class="text-gray-300 flex items-center w-auto">
            <div class="text-sm">
              <NavLink href="#features">Features</NavLink>
              <NavLink href={wiki}>Wiki</NavLink>
              <NavLink href={tip}>Tip</NavLink>
            </div>
          </div>

          <div class="hidden sm:block md:px-16">
            <Button>
              <a href="#downloads">
                <Download />
                <span>Download</span>
              </a>
            </Button>
          </div>

          <a href={discord} class="mr-4">
            <Discord />
          </a>
          <a href={github}>
            <GitHub />
          </a>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
}

function FirstHero() {
  return (
    <Section class="text-gray-200 bg-gray-800 pb-24">
      <div class="md:grid md:grid-cols-2">
        <div class="p-16 place-self-center">
          <h1 class="text-5xl text-center pb-6">
            Best Twitch
            <br />
            Chat Experience.
          </h1>

          <div class="text-center leading-relaxed pb-6">
            Chatterino is a chat client for twitch chat. It aims to be an
            improved/extended version of the twitch web chat.
          </div>

          <div class="grid pb-6">
            <div class="place-self-center">
              <Button>
                <div class="flex p-3">
                  <div class="pr-6 h-6 w-auto">
                    <Windows />
                  </div>
                  <div>
                    <div>Download Chatterino</div>
                    <div class="text-sm">2.2.3 for Windows 64-Bit</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          <div class="grid place-items-center">
            <a href="xD" class="underline">
              More Downloads
            </a>
            <a href="xD" class="underline">
              Get Nightly
            </a>
          </div>
        </div>

        <div
          class="flex p-16 md:pl-4 md:pr-28"
          style={{ height: "70vh", maxHeight: 600, zIndex: 1 }}
          id="chatprop-host"
        >
          <ChatProp></ChatProp>
        </div>
      </div>
    </Section>
  );
}

function FeatureCard({ children, title }) {
  return (
    <div class="bg-gray-700 p-8 rounded grid">
      <div class="place-self-center">
        <h2 class="text-3xl pb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Anchor({ id }) {
  return (
    <div
      style={{
        display: "block",
        top: -100,
        position: "relative",
        visibility: "hidden",
      }}
      id={id}
    />
  );
}

function Features() {
  return (
    <Section
      class="bg-gray-800"
      style={{
        marginTop: -64,
        backgroundColor: "rgba(31, 30, 30, var(--tw-bg-opacity)",
      }}
    >
      <Anchor id="features" />
      <div class="text-gray-200 p-6 md:p-12 space-y-12">
        <div class="space-y-6">
          <h1 class="text-5xl text-center">Key Features</h1>
          <div class="text-center">Check out our key features.</div>
        </div>

        <div class="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 gap-4 md:gap-y-12 md:gap-x-24">
          <FeatureCard title="Batteries Included">
            Support for Twitch, BetterTTV and FrankerFaceZ emotes. Dark Teme.
            (also Light Theme.) Custom made Look &amp; Feel for the best
            chatting experience.
          </FeatureCard>
          <FeatureCard title="Lots of Customizations">
            View multiple chats side-by-side in one tab. Ignore or highlight
            messages based on your own criteria.
          </FeatureCard>
          <FeatureCard title="Engage in Your Communities">
            Talk in both online and top secret offline chats. Get notified when
            people mention you. Connect to as many channels* as you like to.
          </FeatureCard>
          <FeatureCard title="Your Laptop Fans Get to Take a Break">
            Chatterino is a native desktop application that’s easy on your CPU
            &amp; GPU
          </FeatureCard>
        </div>
      </div>
    </Section>
  );
}

function Features2() {
  return (
    <Section class="bg-gray-900 ">
      <div class="p-16 space-y-16 md:space-y-0 md:space-x-16 md:grid md:grid-cols-3">
        <div class="space-y-4">
          <Privacy />
          <div class="text-3xl">Streamer Mode</div>
          <div class="text-blue-200">
            Hide user content while OBS is running. Horses strictly prohibited.
          </div>
        </div>
        <div class="space-y-4">
          <LinkInformation />
          <div class="text-3xl">Link Information</div>
          <div class="text-blue-200">
            Preview image links before opening them. View YouTube stats. Preview
            emotes from links.
            <br />
            Note: This is disabled by default for privacy reasons.
          </div>
        </div>
        <div class="space-y-4">
          <Message />
          <div class="text-3xl">Mentions Panel</div>
          <div class="text-blue-200">
            Combine all your mentions in the “/mentions” panel to keep track.
            Don’t miss important messages while streaming.
          </div>
        </div>
        {/* Custom commands */}
        {/* Recent messages */}
      </div>
    </Section>
  );
}

function Testimonial({ name, occupation, children, imgsrc }) {
  return (
    <div class="text-gray-400 bg-gray-900 p-8 m-8 rounded-lg">
      <div class="flex space-x-8">
        <div
          class="w-16 h-16 md:w-36 md:h-36 flex-shrink-0 rounded-full"
          style={{
            backgroundImage: "url(" + imgsrc + ")",
            backgroundSize: "cover",
          }}
        />
        <div>
          {children}
          <div class="text-xl text-white">{name}</div>
          <div class="text-sm text-white">{occupation}</div>
        </div>
      </div>
    </div>
  );
}

let testimonials = [
  <Testimonial
    name="MOONMOON"
    occupation="Streamer"
    imgsrc="avatars/moonmoon.jpg"
  >
    This program is not cringe. It is extremely POGGERS. I pepeRun from the
    normal Twitch chat client because it is EXTREMELY cringe and lacking in
    basic features sported by Chatterino.
  </Testimonial>,
  <Testimonial name="NymN" occupation="Streamer" imgsrc="avatars/nymn.jpg">
    With a chat full of loud spammers, I wouldn't surive a day without my
    beloved mentions tab!
  </Testimonial>,
  <Testimonial
    name="pokelawls"
    occupation="Streamer"
    imgsrc="avatars/pokelawls.jpg"
  >
    I love Chatterino! It’s made my life much easier as a streamer. Such a great
    chat program. Would highly recommend, has a lot of cool features!
  </Testimonial>,
];

function Testimonials() {
  return (
    <Section class="p-6 md:p-12 bg-gray-800">
      <div class="space-y-8">
        <h1 class="text-white text-5xl text-center p-6">
          What Are the Users Saying?
        </h1>
        {/* <div class="text-gray-300 text-center">Check out our key features.</div> */}

        <div class="block md:hidden">{testimonials}</div>
        <div class="hidden md:block">
          <Carousel
            infiniteLoop={true}
            width="80vw"
            showStatus={false}
            autoPlay={true}
            interval={8000}
          >
            {testimonials}
          </Carousel>
        </div>
      </div>
    </Section>
  );
}

function Miscellaneous() {
  return (
    <Section class="bg-gray-900">
      <div class="bg-gray-800 md:grid md:grid-cols-2 md:space-y-0">
        <div class="p-16 space-y-4">
          <div class="text-5xl">Visit the Wiki</div>
          <div>
            Find information on Chatterino's features and help documents for
            troubleshooting.
          </div>
          <a href={wiki} class="pt-3">
            <Button>Check It Out</Button>
          </a>
        </div>
        <div class="p-16 space-y-4 bg-blue-500">
          <div class="text-5xl">Placeholder</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            nulla leo, accumsan eget vulputate id, suscipit sed est. Sed at
            augue elementum, mollis lectus nec, sollicitudin felis.
          </div>
        </div>
      </div>
    </Section>
  );
}

function Downloads() {
  return (
    <Section
      style={{ backgroundImage: "url(bg_footer.jpg)", backgroundSize: "cover" }}
    >
      <Anchor id="downloads" />
      <div class="space-y-6 py-20 px-2">
        <h2 class="text-center text-5xl">Downloads</h2>

        <div class="text-blue-200 text-center">
          {/* Start Using Chatterino Today. */}
          {/* Chatterino is a chat client for twitch chat. It aims to be an
          improved/extended version of the twitch web chat. */}
        </div>

        <div class="flex flex-wrap justify-evenly">
          <Button class="flex space-x-3 items-center">
            <Windows />
            <div>Windows</div>
          </Button>
          <Button class="flex space-x-3 items-center">
            <Tux />
            <div>Linux</div>
          </Button>
          <Button class="flex space-x-3 items-center">
            <Apple />
            <div>macOS</div>
          </Button>
          <Button class="flex space-x-3 items-center">
            <FreeBSD />
            <div>FreeBSD</div>
          </Button>
        </div>

        <div class="flex space-x-16 justify-center ">
          <Link href="xD">Nightly Builds</Link>
          <Link href="changelog">Changelog</Link>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <Section>
      <div class="p-6 p-x-24 flex flex-wrap justify-evenly space-x-8">
        <div>
          Chatterino is made by{" "}
          <Link href="https://twitter.com/fourtf_xd">fourtf</Link>,{" "}
          <Link href="https://twitter.com/pajlada">pajlada</Link> and
          contributors.
        </div>
        <div>
          Design by <Link href="https://twitter.com/smaczny">Smaczny</Link>
        </div>
      </div>
    </Section>
  );
}
