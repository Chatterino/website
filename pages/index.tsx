import React, { ReactNode, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import {
  allDownloads,
  currentVersion,
  DownloadType,
  freeBsd,
  github,
  linux,
  macOs,
  nightly,
  wiki,
  windows,
  windowsPortable,
} from "../links";
import { LinkInformation, Message, Privacy } from "../components/logos";
import Button from "../components/button";
import Section from "../components/section";
import Link from "../components/link";
import Page from "../components/page";
import Chat from "../components/chat";

export default function Home() {
  return (
    <Page title="Chatterino">
      <FirstHero />
      <Features />
      <Features2 />
      <Testimonials />
      <Downloads />
      <Miscellaneous />
    </Page>
  );
}

function FirstHero() {
  return (
    <Section className="text-gray-200 bg-gray-800 pb-24">
      <div className="md:grid md:grid-cols-2">
        <div className="p-8 sm:p-16 place-self-center">
          <h1 className="text-5xl text-center pb-6">
            Best Twitch
            <br />
            Chat Experience.
          </h1>

          <div className="text-center leading-relaxed pb-6">
            Chatterino is a chat client for Twitch chat. It aims to be an
            improved/extended version of the Twitch web chat.
          </div>

          <div className="grid pb-6">
            <div className="place-self-center">
              <AutoDownloadButton />
            </div>
          </div>

          <div className="grid place-items-center">
            <a href="#downloads" className="underline">
              More Downloads
            </a>
            {/* <a href="xD" className="underline">
              Get Nightly
            </a> */}
          </div>
        </div>

        <div
          className="flex p-16 md:pl-4 md:pr-28 max-xs:transform max-xs:scale-75 max-xs:p-0"
          style={{ height: "70vh", maxHeight: 600, zIndex: 1 }}
          id="chatprop-host"
        >
          <noscript>Enable JavaScript to see this.</noscript>
          <Chat version={currentVersion} />
        </div>
      </div>
    </Section>
  );
}

function FeatureCard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="bg-gray-700 p-8 rounded-sm grid">
      <div className="place-self-center w-full">
        <h2 className="text-3xl pb-6">{title}</h2>
        <div className="text-blue-200">{children}</div>
      </div>
    </div>
  );
}

function Anchor({ id }: { id: string }) {
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
    <Section className="bg-gray-900/50 -mt-16">
      <Anchor id="features" />
      <div className="text-gray-200 p-6 md:p-12 space-y-12">
        <div className="space-y-6">
          <h1 className="text-5xl text-center">Key Features</h1>
          <div className="text-center">Check out our key features.</div>
        </div>

        <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 gap-4 md:gap-y-12 md:gap-x-24">
          <FeatureCard title="Batteries Included">
            <ul className="space-y-2">
              <li>
                Support for Twitch, BetterTTV, FrankerFaceZ, and 7TV emotes.
              </li>
              <li>Dark Theme. (also Light Theme.)</li>
            </ul>
          </FeatureCard>
          <FeatureCard title="Lots of Customizations">
            <ul className="space-y-2">
              <li>View multiple chats side-by-side in one tab.</li>
              <li>Ignore or highlight messages based on your own criteria.</li>
            </ul>
          </FeatureCard>
          <FeatureCard title="Engage in Your Communities">
            <ul className="space-y-2">
              <li>Talk in both online and top-secret offline chats.</li>
              <li>Get notified when people mention you.</li>
              <li>Connect to as many channels as you like to.</li>
            </ul>
          </FeatureCard>
          <FeatureCard title="Your Laptop Fans Get to Take a Break">
            <ul className="space-y-2">
              <li>
                Chatterino is a native desktop application that’s easy on your
                CPU &amp; GPU.
              </li>
            </ul>
          </FeatureCard>
        </div>
      </div>
    </Section>
  );
}

function Features2() {
  return (
    <Section className="bg-gray-900 ">
      <div className="p-16 space-y-16 md:space-y-0 md:space-x-16 md:flex">
        <div className="space-y-4 flex-1">
          <Privacy />
          <div className="text-3xl">Streamer Mode</div>
          <div className="text-blue-200">
            Hide user content while OBS is running. Horses strictly prohibited.
          </div>
        </div>
        <div className="space-y-4 flex-1">
          <LinkInformation />
          <div className="text-3xl">Link Information</div>
          <div className="text-blue-200">
            Preview image links before opening them. View YouTube stats. Preview
            emotes from links.
            <br />
            Note: This is disabled by default for privacy reasons.
          </div>
        </div>
        <div className="space-y-4 flex-1">
          <Message />
          <div className="text-3xl">Mentions Panel</div>
          <div className="text-blue-200">
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

type TestimonialProps = {
  children: ReactNode;
  name: string;
  occupation: string;
  imgsrc: string;
};

function Testimonial({ name, occupation, children, imgsrc }: TestimonialProps) {
  return (
    <div className="text-gray-400 bg-gray-900 p-8 m-8 rounded-lg text-left">
      <div className="flex space-x-8 max-xs:flex-col max-xs:space-x-0">
        <div
          className="w-16 h-16 md:w-36 md:h-36 shrink-0 rounded-full max-xs:self-center max-xs:mb-4"
          style={{
            backgroundImage: "url(" + imgsrc + ")",
            backgroundSize: "cover",
          }}
        />
        <div className="flex flex-col">
          <div className="max-xs:mb-2">{children}</div>
          <div className="grow" />
          <div className="text-xl text-white">{name}</div>
          <div className="text-sm text-white">{occupation}</div>
        </div>
      </div>
    </div>
  );
}

let testimonials = [
  <Testimonial
    name="pokelawls"
    occupation="Streamer"
    imgsrc="avatars/pokelawls.jpg"
    key="poke"
  >
    I love Chatterino! It’s made my life much easier as a streamer. Such a great
    chat program. Would highly recommend, has a lot of cool features!
  </Testimonial>,
  <Testimonial
    name="MOONMOON"
    occupation="Streamer"
    imgsrc="avatars/moonmoon.jpg"
    key="moonmoon"
  >
    <div className="flex flex-wrap items-center">
      This program is not cringe. It is extremely POGGERS. I pepeRun from the
      normal Twitch chat client because it is EXTREMELY cringe and lacking in
      basic features sported by Chatterino.
    </div>
  </Testimonial>,
  <Testimonial
    name="NymN"
    occupation="Streamer"
    imgsrc="avatars/nymn.jpg"
    key="nymn"
  >
    With a chat full of loud spammers, I wouldn't survive a day without my
    beloved mentions tab!
  </Testimonial>,
  <Testimonial
    name="EWROON"
    occupation="Streamer"
    imgsrc="avatars/ewroon.jpg"
    key="ewroon"
  >
    Ever since i've discovered Chatterino my chat experience has changed
    completely. It is really easy to use and very functional. Such a great chat
    program. Would highly recommend!
  </Testimonial>,
];

function Testimonials() {
  return (
    <Section className="p-6 md:p-12 bg-gray-800 max-xs:p-0 mx-auto">
      <div className="space-y-8">
        <h1 className="text-white text-5xl text-center p-6">
          What Are the Users Saying?
        </h1>

        <div className="block md:hidden">{testimonials}</div>
        <div className="hidden md:block">
          <Carousel
            infiniteLoop={true}
            width="80vw"
            showStatus={false}
            autoPlay={true}
            showThumbs={false}
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
    <Section className="bg-gray-800">
      <div className="bg-gray-800 md:grid md:grid-cols-2 md:space-y-0">
        <div className="p-16 space-y-4 max-xs:p-6">
          <div className="text-5xl max-xs:text-4xl">Visit the Wiki</div>
          <div>
            Find information on Chatterino's features and help documents for
            troubleshooting.
          </div>
          <a href={wiki} className="pt-3">
            <Button className="ml-0 mt-6">Check It Out</Button>
          </a>
        </div>
        <div className="p-16 space-y-4 bg-blue-500 max-xs:p-6">
          <div className="text-5xl max-xs:text-4xl">
            Check on the development
          </div>
          <div>
            Chatterino is developed out in the open on our GitHub page. You can
            join the discussion or report issues there!
          </div>
          <a href={github} className="pt-3">
            <Button
              className="ml-0 mt-6"
              colorsClassName="bg-white text-blue-500"
            >
              Pay us a visit
            </Button>
          </a>
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
      <div className="space-y-6 py-20 px-2">
        <h2 className="text-center text-5xl">Downloads</h2>

        <div className="flex flex-wrap justify-evenly">
          <SmallDownloadButton data={windows} />
          <SmallDownloadButton data={linux} />
          <SmallDownloadButton data={macOs} />
          <SmallDownloadButton data={freeBsd} />
        </div>

        <div className="flex flex-wrap justify-around">
          <Link className="px-4" href="changelog">
            Changelog
          </Link>
          <Link className="px-4" href={windowsPortable}>
            Windows Portable
          </Link>
          <Link className="px-4" href={nightly}>
            Nightly Build
          </Link>
          <Link className="px-4" href={allDownloads}>
            Old Builds
          </Link>
        </div>
      </div>
    </Section>
  );
}

function SmallDownloadButton({ data }: { data: DownloadType }) {
  let Icon = data[0];

  return (
    <Link href={data[2]}>
      <Button>
        <div className="flex items-center space-x-3">
          {/* <div className="pr-6 h-6 w-auto"> */}
          {/* key to reset when it changes */}
          <div className="transform scale-75">
            <Icon key={data[1]} />
          </div>
          {/* </div> */}
          <div className="text-sm">{data[1]}</div>
        </div>
      </Button>
    </Link>
  );
}

function DownloadButton({ data }: { data: DownloadType }) {
  let Icon = data[0];

  return (
    <Link href={data[2]}>
      <Button>
        <div className="flex p-3">
          <div className="pr-6 h-6 w-auto">
            {/* <div  children={Icon} key={data[1]} /> */}
            <Icon />
          </div>
          <div>
            <div>Download Chatterino</div>
            <div className="text-sm">{data[1]}</div>
          </div>
        </div>
      </Button>
    </Link>
  );
}

function AutoDownloadButton() {
  const [platform, setPlatform] = React.useState(windows);
  useEffect(() => {
    const { platform } = window.navigator;

    const data = /linux|x11|ubuntu|debian|fedora/i.test(platform)
      ? linux
      : /mac/i.test(platform)
        ? macOs
        : /freebsd/i.test(platform)
          ? freeBsd
          : windows;
    setPlatform(data);
  });

  return (
    <div>
      <DownloadButton data={platform} />
    </div>
  );
}
