//node_module imports
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { EffectCoverflow, Autoplay, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

//custom imports
import logo from "../assets/web_design/navbar_logo.png";
import blankBevoVideo from "../assets/web_design/BlankBevo.mp4"; // Your intro video


function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const [showLogoIntro, setShowLogoIntro] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  // Placeholder: replace with real sponsor images when available
  const sponsorImages = [];

  // Placeholder: add event objects { image, title, date } when available
  const eventCarousel = [];

  useEffect(() => {
  // Check if intro has been shown in this session
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
  
  if (hasSeenIntro) {
    // Skip intro, show main content immediately
    setShowVideo(false);
    setShowLogoIntro(false);
    setShowMainContent(true);
    return;
  }

  let videoTimer;
  let logoTimer;

  // Play video for 5s, then logo animation for 2.8s, then show main content
  videoTimer = setTimeout(() => {
    setShowVideo(false);
    setShowLogoIntro(true);

    logoTimer = setTimeout(() => {
      setShowLogoIntro(false);
      setShowMainContent(true);
      // Mark intro as seen for this session
      sessionStorage.setItem('hasSeenIntro', 'true');
    }, 2800);
  }, 5000);

    return () => {
      clearTimeout(videoTimer);
      clearTimeout(logoTimer);
    };
  }, []);

  return (
  <>
    <style>
      {`
        @keyframes smoothIntro {
          0% { opacity: 0; transform: scale(0.75); filter: blur(8px); }
          40% { opacity: 1; transform: scale(1); filter: blur(0); }
          70% { opacity: 1; transform: scale(1); filter: blur(0); }
          100% { opacity: 0; transform: scale(1.18); filter: blur(4px); }
        }
        .intro-animation { 
          animation: smoothIntro 2.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; 
        }
      `}
    </style>

    <div className="min-h-screen w-full bg-[#FCF0D6] text-gray-900 relative flex flex-col overflow-hidden">

      {/* FULLSCREEN VIDEO */}
      {showVideo && (
        <video
          src={blankBevoVideo}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
      )}

      {/* LOGO ANIMATION */}
      {showLogoIntro && (
        <img
          src={logo}
          alt="Intro Logo"
          className="w-auto h-auto absolute z-20 inset-0 m-auto intro-animation"
        />
      )}

      {/* MAIN CONTENT */}
      {showMainContent && (
        <>
          <main className="w-full flex flex-col gap-24">

            {/* HOME PAGE HERO */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full py-16 md:py-20 px-6 bg-gradient-to-r from-[#FD652F] to-[#72A9BE] text-white flex flex-col md:flex-row items-center justify-center gap-10"
            >
              {/* TEXT SECTION */}
              <div className="md:w-1/2 text-center md:text-left">
                <motion.h1
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-5xl font-extrabold mb-6"
                >
                  UT SHPE
                </motion.h1>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg md:text-xl"
                >
                  Empowering Hispanic students in STEM through community, mentorship,
                  and professional development.
                </motion.p>
              </div>

              {/* RIGHT SIDE — placeholder box until slideshow images are added */}
              <motion.div
                className="md:w-1/2 w-full h-[300px] sm:h-[350px] md:h-[400px] relative rounded-xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="w-full h-full bg-white/20 flex items-center justify-center text-white/60 text-lg font-semibold">
                  Slideshow Placeholder
                </div>
              </motion.div>
            </motion.section>

            {/* SPONSORS — hidden when empty, shows when sponsorImages has entries */}
            {sponsorImages.length > 0 && (
              <section className="w-full bg-[#FCF0D6] overflow-hidden">
                <h2 className="text-4xl font-bold mb-8 text-[#001F5B] text-center">
                  Our Sponsors
                </h2>

                <div className="relative w-full overflow-hidden">
                  <div className="flex animate-scrollLogos gap-10 w-max">
                    {[...sponsorImages, ...sponsorImages].map((img, idx) => (
                      <div key={idx} className="flex-shrink-0 h-24 w-48 flex items-center justify-center">
                        <img
                          src={img}
                          alt={`Sponsor ${idx + 1}`}
                          className="max-h-20 max-w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <style>{`
                  @keyframes scrollLogos {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .animate-scrollLogos {
                    display: flex;
                    width: max-content;
                    animation: scrollLogos 15s linear infinite;
                  }
                `}</style>
              </section>
            )}

            {/* Upcoming Events Section */}
            <section className="w-full py-12 from-amber-50 via-yellow-50 to-orange-50 text-center px-6 relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-200/30 rounded-full blur-3xl"></div>

              <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-12">
                  <h2 className="text-4xl font-bold mb-8 text-[#001F5B]">
                    Upcoming Events
                  </h2>
                  <p className="text-lg text-gray-700 max-w-xl mx-auto">
                    Join us for our latest events and activities. Swipe, click, or use the arrows to explore!
                  </p>
                </div>

                {eventCarousel.length > 0 ? (
                  <div className="relative">
                    <Swiper
                      effect="coverflow"
                      grabCursor={true}
                      centeredSlides={true}
                      slidesPerView="auto"
                      navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                      }}
                      coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                      }}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      modules={[EffectCoverflow, Autoplay, Navigation]}
                      className="py-12 events-swiper"
                    >
                      {eventCarousel.map((item, index) => (
                        <SwiperSlide key={index} style={{ width: '280px' }} className="sm:!w-[350px]">
                          <div className="flex flex-col items-center">
                            <div className="relative group">
                              <img
                                src={item.image}
                                alt={item.title}
                                onClick={() => setExpandedImage(item.image)}
                                className="w-64 sm:w-80 md:w-[22rem] rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-orange-300/50 hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                            <div className="text-center mt-6 px-2">
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                              <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-1.5 rounded-full">
                                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm sm:text-base font-semibold text-orange-700">{item.date}</p>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Navigation Buttons */}
                    <button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 hover:scale-110">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 hover:scale-110">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-full py-16 bg-orange-50 rounded-2xl text-gray-400 text-lg font-semibold">
                    No upcoming events — add items to <code>eventCarousel</code> to populate this section.
                  </div>
                )}
              </div>

              {expandedImage && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 md:p-8" onClick={() => setExpandedImage(null)}>
                  <img src={expandedImage} alt="Expanded event" className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] w-auto h-auto object-contain rounded-xl shadow-2xl" />
                </div>
              )}

              <style>
                {`
                  .events-swiper {
                    padding-left: 60px !important;
                    padding-right: 60px !important;
                  }
                  .events-swiper .swiper-button-next,
                  .events-swiper .swiper-button-prev {
                    color: #FD652F;
                    background: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transition: all 0.3s ease;
                    top: 50%;
                    transform: translateY(-50%);
                  }
                  .events-swiper .swiper-button-next:hover,
                  .events-swiper .swiper-button-prev:hover {
                    background: #FD652F;
                    color: white;
                    transform: translateY(-50%) scale(1.1);
                  }
                `}
              </style>
            </section>

            {/* Office Hours Section — placeholder until image is added */}
            <section className="w-full py-10 text-center px-6">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-[#001F5B]">Office Hours</h2>
                {/* Replace this div with: <img src={officeHoursImg} alt="Office Hours" className="mx-auto w-full sm:w-11/12 lg:w-5/6 rounded-xl shadow-xl" /> */}
                <div className="w-full sm:w-11/12 lg:w-5/6 mx-auto rounded-xl shadow-xl bg-gray-100 py-20 text-gray-400 text-lg font-semibold">
                  Office Hours Image Placeholder
                </div>
              </div>
            </section>

          </main>
        </>
      )}
    </div>
  </>
  );
}

export default Home;