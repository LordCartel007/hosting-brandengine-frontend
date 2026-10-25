import React from 'react';
import Header from '../components/Header';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import HorizontalCarousel from '../components/HorizontalCarousel';

const Title = styled.h1`
  font-weight: bolder;

  margin-top: 20px;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Rye', serif;
  font-weight: 400;
  font-style: normal;
  flex: 1; /* Makes title fill available space */
  justify-content: center;

  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }

  @media screen and (min-width: 767px) {
    font-size: 3rem;
  }

  /* nest hub tv screen */
  @media screen and (min-width: 1023px) {
    font-size: 4rem;
  }
`;

const Pwords = styled.p`
  font-weight: bolder;

  margin: 0;
  color: #ffc107;
  text-decoration: none;
  font-family: 'Rye', serif;
  font-weight: 400;
  font-style: normal;
  flex: 1; /* Makes title fill available space */
  justify-content: center;

  @media screen and (max-width: 767px) {
    font-size: 0%.9;
  }

  @media screen and (min-width: 767px) {
    font-size: 1.2rem;
  }

  /* nest hub tv screen */
  @media screen and (min-width: 1023px) {
    font-size: 1.3rem;
  }
`;
const PathButton = styled.button`
  background-color: #ffc107;
  color: #0e0e10; /* Text color */
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px; /* Optional: Rounded corners */
  font-family: 'Rye', serif;
  margin-top: 25px;
  padding: 10px;
  width: 200px;
  height: 50px;
  font-style: normal;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    height: 40px;
    width: 90px;
  }
`;

const StyledDiv = styled.div`
  height: 50vh;
  width: 100vw;
  @media screen and (max-width: 767px) {
    height: 30vh;
    width: 100vw;
  }
`;

const StyledVideo = styled.video`
  height: 100vh;
  width: 100vw;
  @media screen and (max-width: 767px) {
    height: 100vh;
    width: 100vw;
  }
`;

const StyledTitleDiv = styled.div`
  justify-content: center;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
`;

const StyledVideotwo = styled.video`
  height: 100vh;
  width: 100vw;
  @media screen and (max-width: 767px) {
    height: 70vh;
    width: 100vw;
  }
`;

// const StyledIframe = styled.iframe`
//   width: 100%;
//   height: 70vh;
//   border: none;
//   margin: 0;
//   padding: 0;
//   border: 0;
//   outline: 0;
//   overflow: hidden;
//   display: block;
//   max-width: 100%;
//   max-height: 100%;
//    allowFullScreen

// `;

const HomePage = () => {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type !== 'brand-engine-view-display-height') {
        return;
      }

      const height = event.data.height;

      if (typeof height !== 'number') {
        return;
      }

      setIframeHeight(`${height}vh`);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <Header />
      {/* <StyledIframe className="carousel" src="http://localhost:5174/thor" /> */}
      {/* <StyledIframe
        className="carousel"
        src="http://localhost:5174/thor"
        scrolling="no"
        allowFullScreen
      /> */}
      {/* <iframe
        className="carousel"
        src="http://localhost:5174/thor"
        scrolling="no"
        allowFullScreen
        style={{
          width: '100%',
          height: '70vh',
          border: '0',
          margin: '0',
          padding: '0',
          outline: '0',
          overflow: 'hidden',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      /> */}

      <iframe
        ref={iframeRef}
        className="carousel"
        src="https://brandenginev.lordcartel.com/LordCartel"
        scrolling="no"
        allowFullScreen
        style={{
          width: '100%',
          height: iframeHeight,
          border: '0',
          margin: '0',
          padding: '0',
          outline: '0',
          overflow: 'hidden',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
      <div className="seperation-div"></div>
      <div className="brand-engine-marketing">
        <div className="marketing-inner">
          <p className="marketing-eyebrow">
            Now I Am Become Death , Destroyer Of Designs.
          </p>
          <p className="marketing-eyebrow">
            Lord Cartel Presents - Brand Engine.
          </p>

          <p className="marketing-eyebrow">
            A Design Engine So Advanced It Looks Like Sorcery
          </p>

          <h1 className="marketing-title">
            YOUR BRAND WAS NEVER
            <span> MEANT TO BLEND IN.</span>
          </h1>

          <p className="marketing-intro">
            The world is crowded with websites and apps that look alike. Same
            layouts. Same experiences. Same forgettable first impressions.
          </p>

          <p className="marketing-description">
            Brand Engine changes the experience. Bring your brand into a new
            dimension with immersive 3D cinematic visuals, animated product
            experiences, and flying assets that command attention.
          </p>

          <p className="marketing-description">
            Not another template. Not another ordinary website. A distinctive
            brand experience built to make people stop, look, and remember.
          </p>
          <p className="marketing-description">
            With the brand engine you can create infinite experience , with 100s
            of thousands to millions of variation possibility with the 80 plus
            configuration settings in your dashboard. With ready asset you can
            change the look of your brand experience with a button.
          </p>

          <p className="marketing-description">
            No need to rebuild your app or site from scratch all you need to do
            is use our embed link and the brand engine appears on your site or
            app , anywhere that can display visuals, brand engine can be there.
          </p>

          <p className="marketing-description">
            We create custom brand experience using the brand engine so you can
            stand out from your competitors using the anti design equation , the
            design to end all designs.
          </p>

          <div className="marketing-cta">
            <h2>DON'T JUST SHOW YOUR BRAND.</h2>
            <h2>MAKE THEM EXPERIENCE IT.</h2>

            <p>The next evolution of your digital presence starts here.</p>

            <a href="/pricing" className="marketing-button">
              Release Your Brand Engine <span>↗</span>
            </a>
          </div>
        </div>
      </div>
      <div className="seperation-div"></div>
      <div className="brand-engine-marketing-4">
        <div className="marketing-inner">
          <h1 className="marketing-title">
            WHY
            <span> BLEND IN?</span>
          </h1>
          <p className="marketing-eyebrow">
            The Internet Doesn't Need Another Ordinary Website Or App.
          </p>

          <p className="marketing-description">
            Your customers have seen thousands of websites and apps. Familiar
            layouts. Static images. Predictable experiences. Why should yours be
            any different?
          </p>

          <p className="marketing-eyebrow">Attention Is Earned.</p>

          <p className="marketing-description">
            Make your first impression impossible to mistake for another
            template.
          </p>

          <p className="marketing-eyebrow">Perception Is Everything.</p>

          <p className="marketing-description">
            Present your products with the ambition, detail and visual impact
            your brand deserves.
          </p>

          <p className="marketing-eyebrow">Ordinary Is Forgettable.</p>

          <p className="marketing-description">
            Create an experience that gives people something distinctive to
            remember.
          </p>

          <p className="marketing-eyebrow">
            Your Brand Deserves Its Own World.
          </p>

          <p className="marketing-description">
            Bring together flying visual assets, immersive video, live 3D models
            and customizable experiences.
          </p>

          <p className="marketing-eyebrow">
            Built Around Your Brand. Controlled By You.
          </p>

          <p className="marketing-description">
            Customize your Brand Engine through your own dashboard, with control
            over the features your engine supports.
          </p>

          <p className="marketing-eyebrow">
            STOP COMPETING TO LOOK LIKE EVERYONE ELSE.
          </p>

          <p className="marketing-description">
            Give them something different to look at.
          </p>

          <div className="marketing-cta">
            <p>
              Anti design is found and we would stop at nothing to possess it.
            </p>
            <h2>Ready Your Brand Engine.</h2>
            <h2>We Would Use The New Ways.</h2>

            <a href="/pricing" className="marketing-button">
              For Brand Engine <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="seperation-div"></div>
      <div className="brand-engine-marketing-2">
        <div className="marketing-inner">
          <h1 className="marketing-title">
            ABOUT
            <span> BRAND ENGINE</span>
          </h1>
          <p className="marketing-eyebrow">And So Begins The End.</p>

          <p className="marketing-description">
            You get your flying assets with full screen view , working link
            buttons, music experence, any 3d model of your choice, cinematic 360
            worlds, dashboard with 80 plus settings for you to play with.
          </p>
          <p className="marketing-description">
            Customise your brandengine and change the look of your brand
            experience with the click of a button
          </p>

          <p className="marketing-description">
            No need to start throwing away your old site or app. Just embed the
            brand engine through our link.
          </p>

          <p className="marketing-description">
            Brand Engine works on all screen size by auto adjusting, it was
            created to work on all device including Low end device like low
            budget phone below 4gb ram . It can also be experienced and
            controlled by VR.
          </p>
          <p className="marketing-description">
            The heaviest form of brand engine run at very low ram memory of
            between 100 to 300mb ram so its lighter than running youtube .
          </p>
          <p className="marketing-description">
            Brand God is the Heaviest. It is extremely light weight , we can
            make it even more lighter at your request
          </p>

          <p className="marketing-description">
            There is 2 type of the brand engine and there are 2 modes on each
            engine, all showcased in our showcase and pricing page.
          </p>

          <p className="marketing-description">
            We use already made outsourced model for your brand experience, if
            you have any custom model you can send for optimisation or to be
            used , delivery time takes 2 days to 1 week depending on work load.
            We optimise models to work on low end device and also make custom
            360 worlds panorama with existing outsourced models.
          </p>

          <p className="marketing-description">
            The Brand Engine was bred to design infinite brand experience. Where
            was your old brand experience built — on a farm !!?” 💀. Get Brand
            Engine Today.
          </p>
        </div>
      </div>

      <div className="seperation-div"></div>
      <div className="brand-engine-marketing-3">
        <div className="marketing-inner">
          <h1 className="marketing-title">
            FEATURES OF
            <span> BRAND ENGINE</span>
          </h1>
          <p className="marketing-eyebrow">A fine brand is its own reward.</p>
          <p className="marketing-eyebrow">
            Your brand experience have been weighed on the scales and found
            wanting .
          </p>

          <p className="marketing-description">
            Here are some of the features of the brand engine, - doubletap
            spin-roll, - autoplaymusic, - responsive , - glow light, - animated
            logo, - 360 cinematic background world, - viewable pics and video, -
            link button to another page, - auto playing video, - VR control and
            experience mode, - Fast load speed, -Embeddable.
          </p>
          <p className="marketing-description">
            - Cinematic, - 3d animated model, - freeze world and model, - choose
            number of pic or video in brand engine , - 4 modes, you can display
            only model and 360 background , flying assets and 360 background ,
            flying assets and model and 360 background , 360 background
          </p>

          <p className="marketing-description">
            - drag to expand or reduce the flying asset width on desktop, -
            works on low budget phone under 4gb ram, - Control Dasboard , - ram
            consumption on average 100 to 300mb, e.t.c
          </p>

          <p className="marketing-description">
            - Almost everything you see is editable to the teeth.
          </p>

          <p className="marketing-description">
            - Embed my server and the brand engine enter. It's made for design,
            cause I'm the inventor. 3D inside 3D
          </p>
        </div>
      </div>

      <div className="seperation-div"></div>
      <div className="brand-engine-marketing-5">
        <div className="marketing-inner">
          <h1 className="marketing-title">
            INVENTOR OF
            <span> BRAND ENGINE</span>
          </h1>
          <p className="marketing-eyebrow">
            Brand Engine Days Ahead, Days Of Original Cartel
          </p>

          <p className="marketing-description">
            I searched the universe for the ultimate experience, the anti design
            equation, the design to end all design , the power of a design god.
          </p>

          <p className="marketing-description">
            I scorched a hundred thousand codes to dust, looking for the anti
            design equation .
          </p>
          <p className="marketing-description">
            I shall stride upon thy brands and bask in the glow of anti design
            and all of brand experience shall be mine, It shall be so !!, my
            master.
          </p>

          <p className="marketing-description">
            Out of desperation , madness, a software engineer harnessed the
            powers of a design god and turned it into the brand engine , that
            engineer was Lord Cartel.
          </p>

          <p className="marketing-description">
            I don't code now i make brand move , if brand engine sees you it
            don't speak, that means it don't talk with you.
          </p>
          <p className="marketing-description">
            Anti design is found and we would stop at nothing to possess it ,
            ready the brand engine , we would use the new ways . For Brand
            Engine .
          </p>
          <a href="/contact" className="marketing-button">
            Contact Us <span>↗</span>
          </a>
        </div>
      </div>

      <div className="seperation-div"></div>
      <div className="brand-engine-marketing-7">
        <div className="marketing-inner">
          <h1 className="marketing-title">
            Monthly
            <span>Subscription</span>
          </h1>

          <p className="marketing-description">
            Subscription cost covers maintainance and updates. A single unit
            equals to one api fetch in 24 hours, a new api fetch is not
            initiated for users on your Brand Engine even on reload until after
            24 hours or you updated your Brand Engine.
          </p>

          <p className="marketing-eyebrow">Copyright</p>
          <p className="marketing-description">
            For copyright issues contact us if you want a take down of your own
            copyrighted material .
          </p>
          <p className="marketing-description">
            Or have inquiry of the brand engine , contact us now.
          </p>
          <a href="/contact" className="marketing-button">
            Contact Us <span>↗</span>
          </a>
        </div>
      </div>

      <div className="seperation-div"></div>
      <div className="banner-container">
        <img
          src="https://assets2.lordcartel.com/banner-3.webp "
          alt="Lord Cartel banner"
          className="banner-image"
        />
      </div>
      {/* <HorizontalCarousel /> */}
      <Footer />
    </div>
  );
};

export default HomePage;

// the way to send the height post message from brand engine the normal html way
//  <iframe
//       id="brand-engine"
//       class="carousel"
//       src="http://localhost:5174/thor"
//       scrolling="no"
//       allowfullscreen
//       style="
//         width: 100%;
//         height: 70vh;
//         border: 0;
//         margin: 0;
//         padding: 0;
//         outline: 0;
//         overflow: hidden;
//         display: block;
//         max-width: 100%;
//         max-height: 100%;
//       "
//     ></iframe>

//     <script>
//       const iframe = document.getElementById('brand-engine');

//       window.addEventListener('message', (event) => {
//         if (event.data?.type !== 'brand-engine-view-display-height') {
//           return;
//         }

//         const height = event.data.height;

//         if (typeof height !== 'number') {
//           return;
//         }

//         iframe.style.height = `${height}vh`;
//       });
//     </script>
