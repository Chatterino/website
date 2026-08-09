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
    <Section className="hero">
      <div className="hero-grid">
        <div className="hero-intro">
          <h1 className="hero-title">
            Best Twitch
            <br />
            Chat Experience.
          </h1>

          <div className="hero-lead">
            Chatterino is a chat client for Twitch chat. It aims to be an
            improved/extended version of the Twitch web chat.
          </div>

          <div className="hero-cta">
            <div>
              <AutoDownloadButton />
            </div>
          </div>

          <div className="hero-links">
            <a href="#downloads">More Downloads</a>
          </div>
        </div>

        <div
          className="hero-chat"
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
    <div className="feature-card">
      <div>
        <h2>{title}</h2>
        <div className="feature-card-text">{children}</div>
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
    <Section className="features">
      <Anchor id="features" />
      <div className="features-inner">
        <div className="features-header">
          <h1>Key Features</h1>
          <div>Check out our key features.</div>
        </div>

        <div className="features-grid">
          <FeatureCard title="Batteries Included">
            <ul>
              <li>
                Support for Twitch, BetterTTV, FrankerFaceZ, and 7TV emotes.
              </li>
              <li>Dark Theme. (also Light Theme.)</li>
            </ul>
          </FeatureCard>
          <FeatureCard title="Lots of Customizations">
            <ul>
              <li>View multiple chats side-by-side in one tab.</li>
              <li>Ignore or highlight messages based on your own criteria.</li>
            </ul>
          </FeatureCard>
          <FeatureCard title="Engage in Your Communities">
            <ul>
              <li>Talk in both online and top-secret offline chats.</li>
              <li>Get notified when people mention you.</li>
              <li>Connect to as many channels as you like to.</li>
            </ul>
          </FeatureCard>
          <FeatureCard title="Your Laptop Fans Get to Take a Break">
            <ul>
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
    <Section className="highlights">
      <div className="highlights-inner">
        <div className="highlight">
          <Privacy />
          <div className="highlight-title">Streamer Mode</div>
          <div className="body-text">
            Hide user content while OBS is running. Horses strictly prohibited.
          </div>
        </div>
        <div className="highlight">
          <LinkInformation />
          <div className="highlight-title">Link Information</div>
          <div className="body-text">
            Preview image links before opening them. View YouTube stats. Preview
            emotes from links.
            <br />
            Note: This is disabled by default for privacy reasons.
          </div>
        </div>
        <div className="highlight">
          <Message />
          <div className="highlight-title">Mentions Panel</div>
          <div className="body-text">
            Combine all your mentions in the “/mentions” panel to keep track.
            Don’t miss important messages while streaming.
          </div>
        </div>
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
    <div className="testimonial">
      <div className="testimonial-row">
        <div
          className="testimonial-avatar"
          style={{
            backgroundImage: "url(" + imgsrc + ")",
            backgroundSize: "cover",
          }}
        />
        <div className="testimonial-body">
          <div className="testimonial-quote">{children}</div>
          <div className="testimonial-fill" />
          <div className="testimonial-name">{name}</div>
          <div className="testimonial-role">{occupation}</div>
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
    <div className="testimonial-inline">
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
    <Section className="testimonials">
      <div className="testimonials-inner">
        <h1 className="testimonials-title">What Are the Users Saying?</h1>

        <div className="testimonials-stack">{testimonials}</div>
        <div className="testimonials-carousel">
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
    <Section className="promo">
      <div className="promo-grid">
        <div className="promo-panel">
          <div className="promo-title">Visit the Wiki</div>
          <div>
            Find information on Chatterino's features and help documents for
            troubleshooting.
          </div>
          <a href={wiki} className="promo-link">
            <Button className="promo-button">Check It Out</Button>
          </a>
        </div>
        <div className="promo-panel promo-panel-accent">
          <div className="promo-title">Check on the development</div>
          <div>
            Chatterino is developed out in the open on our GitHub page. You can
            join the discussion or report issues there!
          </div>
          <a href={github} className="promo-link">
            <Button className="promo-button" inverted>
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
      <div className="downloads-inner">
        <h2 className="downloads-title">Downloads</h2>

        <div className="downloads-buttons">
          <SmallDownloadButton data={windows} />
          <SmallDownloadButton data={linux} />
          <SmallDownloadButton data={macOs} />
          <SmallDownloadButton data={freeBsd} />
        </div>

        <div className="downloads-links">
          <Link className="downloads-link" href="changelog">
            Changelog
          </Link>
          <Link className="downloads-link" href={windowsPortable}>
            Windows Portable
          </Link>
          <Link className="downloads-link" href={nightly}>
            Nightly Build
          </Link>
          <Link className="downloads-link" href={allDownloads}>
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
        <div className="download-tag">
          {/* key to reset when it changes */}
          <div className="download-tag-icon">
            <Icon key={data[1]} />
          </div>
          <div className="download-tag-label">{data[1]}</div>
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
        <div className="download-cta">
          <div className="download-cta-icon">
            <Icon />
          </div>
          <div>
            <div>Download Chatterino</div>
            <div className="download-cta-sub">{data[1]}</div>
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
