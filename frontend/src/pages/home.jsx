import React from "react";

const Students = () => {
  const courses = [
    {
      id: 1,
      instructor: "Jason Williams",
      category: "Shkencë",
      title: "Data Science dhe Machine Learning me Python - Hap pas Hapi!",
      time: "08 orë 15 min",
      lectures: "29 Leksione",
      price: "385.00€",
      oldPrice: "440.00€",
      rating: "4.9",
      img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500"
    },
    {
      id: 2,
      instructor: "Pamela Foster",
      category: "Dizajn",
      title: "Krijoni Skema Ngjyrash Mahnitëse për Projektet tuaja UX",
      time: "08 orë 15 min",
      lectures: "29 Leksione",
      price: "420.00€",
      rating: "4.9",
      img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500"
    },
    {
      id: 3,
      instructor: "Rose Simmons",
      category: "Biznes",
      title: "Kultura dhe Lidershipi: Strategjitë për një Biznes të Suksesshëm",
      time: "08 orë 15 min",
      lectures: "29 Leksione",
      price: "295.00€",
      oldPrice: "340.00€",
      rating: "4.9",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500"
    }
  ];

  return (
    <div className="w-full bg-white font-['Jost'] antialiased">
      {/* 1. TOPBAR - I hollë dhe elegant */}
      <div className="bg-[#212832] text-white py-2 border-b border-gray-700">
        <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center text-[13px]">
          <p>Të gjitha kurset me <span className="text-[#309255] font-bold">28% ulje</span> për përdoruesit e rinj.</p>
          <div className="flex gap-6 items-center">
             <span className="flex items-center gap-2">📞 (970) 262-1413</span>
             <span className="flex items-center gap-2">✉️ info@edule.com</span>
             <div className="flex gap-3 ml-4 border-l border-gray-600 pl-4">
                <a href="#" className="hover:text-[#309255]">Fb</a>
                <a href="#" className="hover:text-[#309255]">Tw</a>
                <a href="#" className="hover:text-[#309255]">In</a>
             </div>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR - I bardhë me butona si në foto */}
      <nav className="bg-white py-5 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
          <div className="text-3xl font-bold text-[#212832] flex items-center gap-2">
            <div className="w-10 h-10 bg-[#eefbf3] rounded-lg flex items-center justify-center">
                <span className="text-[#309255]">📚</span>
            </div>
            Edu<span className="text-[#309255]">Le</span>
          </div>
          <ul className="hidden lg:flex gap-10 font-medium text-[#212832]">
            <li><a href="#" className="hover:text-[#309255] transition">Ballina</a></li>
            <li><a href="#" className="hover:text-[#309255] transition text-[#309255]">Kurset</a></li>
            <li><a href="#" className="hover:text-[#309255] transition">Faqet</a></li>
            <li><a href="#" className="hover:text-[#309255] transition">Blog</a></li>
            <li><a href="#" className="hover:text-[#309255] transition">Kontakt</a></li>
          </ul>
          <div className="flex items-center gap-6">
            <button className="font-semibold text-[#212832] hover:text-[#309255]">Kyçuni</button>
            <button className="bg-white border-2 border-[#309255] text-[#309255] px-7 py-2.5 rounded-md font-bold hover:bg-[#309255] hover:text-white transition-all">Regjistrohuni</button>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION - E gjelbër e lehtë me border të rrumbullakosur poshtë */}
      <header className="bg-[#eefbf3] pt-20 pb-32 rounded-b-[100px] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <p className="text-[#309255] font-bold uppercase tracking-widest text-sm mb-4">Fillo kursin tënd të preferuar</p>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.1] text-[#212832] mb-8">
              Mëso nga kudo dhe ndërto <span className="text-[#309255] underline decoration-4 underline-offset-8">karrierën tënde.</span>
            </h1>
            <p className="text-gray-600 text-lg mb-10 max-w-md leading-relaxed">Ka mbijetuar jo vetëm pesë shekuj, por edhe kërcimin në rregullimin elektronik të tekstit.</p>
            <button className="bg-[#309255] text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-[#257443] transition shadow-xl">Fillo një Kurs</button>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-full border-[15px] border-white/50 overflow-hidden w-[450px] h-[450px] mx-auto">
               <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800" alt="Hero" className="w-full h-full object-cover" />
            </div>
            {/* Badge-i 1,235 courses */}
            <div className="absolute top-10 left-0 bg-white p-4 rounded-2xl shadow-2xl z-20 flex items-center gap-3 animate-bounce">
                <div className="bg-[#eefbf3] p-2 rounded-lg text-2xl">🎓</div>
                <div>
                    <div className="font-black text-xl text-[#212832]">1,235</div>
                    <div className="text-xs text-gray-500 uppercase font-bold">Kurse online</div>
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. COURSES SECTION */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
               <h2 className="text-4xl font-black text-[#212832]">Të gjitha <span className="text-[#309255]">Kurset</span> e EduLe</h2>
               <div className="w-20 h-1.5 bg-[#309255] mt-4 rounded-full"></div>
            </div>
            <div className="mt-8 md:mt-0 relative">
               <input type="text" placeholder="Kërko kursin tënd..." className="bg-gray-50 border border-gray-200 py-3 px-6 pr-12 rounded-lg w-80 outline-none focus:border-[#309255]" />
               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map(course => (
              <div key={course.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="overflow-hidden rounded-2xl mb-6 relative">
                   <img src={course.img} alt="course" className="w-full h-56 object-cover group-hover:scale-110 transition duration-700" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg flex items-center gap-1">
                      <span className="text-yellow-500">★</span> <span className="font-bold text-sm text-[#212832]">{course.rating}</span>
                   </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-gray-500 flex items-center gap-2">👤 {course.instructor}</span>
                  <span className="bg-[#eefbf3] text-[#309255] text-[11px] font-black uppercase px-3 py-1 rounded-md tracking-wider">{course.category}</span>
                </div>
                <h3 className="text-xl font-bold text-[#212832] mb-6 line-clamp-2 min-h-[56px] hover:text-[#309255] transition cursor-pointer">{course.title}</h3>
                <div className="flex items-center gap-6 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-50">
                    <span className="flex items-center gap-2">⏱ {course.time}</span>
                    <span className="flex items-center gap-2">📖 {course.lectures}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-[#309255] font-black text-2xl">{course.price}</span>
                    {course.oldPrice && <span className="text-gray-400 line-through text-sm">{course.oldPrice}</span>}
                  </div>
                  <button className="bg-[#eefbf3] p-2 rounded-lg text-[#309255] hover:bg-[#309255] hover:text-white transition">➔</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <button className="border-2 border-[#309255] text-[#309255] px-10 py-3.5 rounded-lg font-black hover:bg-[#309255] hover:text-white transition-all shadow-lg">Shiko të Gjitha</button>
          </div>
        </div>
      </section>

      {/* 5. INSTRUCTOR BANNER - I rregulluar me hapësirë të bollshme */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto bg-[#eefbf3] p-16 md:p-24 rounded-[60px] flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden group">
          {/* Dekoret anash si në foto */}
          <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl">🌿</div>
          <div className="absolute bottom-0 left-0 p-10 opacity-10 text-9xl">🌿</div>
          
          <div className="z-10 max-w-2xl text-center md:text-left">
             <p className="text-[#309255] font-black uppercase tracking-widest text-sm mb-4">Bëhu Instruktor</p>
             <h2 className="text-4xl md:text-5xl font-black text-[#212832] leading-tight">Dëshironi t'i bashkoheni EduLe si <span className="text-[#309255] border-b-4 border-[#309255]/20">një instruktor?</span></h2>
             <p className="mt-6 text-gray-600 text-lg">Bashkohuni me mijëra edukatorë në mbarë botën dhe filloni të ndani dijen tuaj sot.</p>
          </div>
          <div className="z-10">
             <button className="bg-[#309255] text-white px-12 py-5 rounded-xl font-black text-xl hover:bg-[#257443] transition-all transform hover:scale-110 shadow-2xl">Dërgo Informacionet</button>
          </div>
        </div>
      </section>

      {/* 6. FOOTER - I rreshtuar perfekt */}
      <footer className="bg-[#212832] text-white pt-24 pb-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <div className="text-3xl font-black mb-8">Edu<span className="text-[#309255]">Le</span></div>
              <p className="text-gray-400 leading-relaxed mb-8">Platforma lider për edukim online, duke lidhur studentët me instruktorët më të mirë në mbarë botën.</p>
              <div className="flex gap-4">
                 <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#309255] hover:border-[#309255] transition">f</a>
                 <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#309255] hover:border-[#309255] transition">t</a>
                 <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#309255] hover:border-[#309255] transition">in</a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-10 border-l-4 border-[#309255] pl-4">Informacion</h4>
              <ul className="text-gray-400 space-y-4 font-medium">
                <li><a href="#" className="hover:text-[#309255] hover:translate-x-2 transition-all inline-block">Rreth Nesh</a></li>
                <li><a href="#" className="hover:text-[#309255] hover:translate-x-2 transition-all inline-block">Kurset Tona</a></li>
                <li><a href="#" className="hover:text-[#309255] hover:translate-x-2 transition-all inline-block">Mësimdhënia</a></li>
                <li><a href="#" className="hover:text-[#309255] hover:translate-x-2 transition-all inline-block">Kontaktet</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-10 border-l-4 border-[#309255] pl-4">Linqe të Shpejta</h4>
              <ul className="text-gray-400 space-y-4 font-medium">
                <li><a href="#" className="hover:text-[#309255] hover:translate-x-2 transition-all inline-block">Politika e Privatësisë</a></li>
                <li><a href="#" className="hover:text-[#309255] hover:translate-x-2 transition-all inline-block">Kushtet e Përdorimit</a></li>
                <li><a href="#" className="hover:text-[#309255] hover:translate-x-2 transition-all inline-block">Suporti</a></li>
                <li><a href="#" className="hover:text-[#309255] hover:translate-x-2 transition-all inline-block">Pyetje të Shpeshta</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-10 border-l-4 border-[#309255] pl-4">Abonohu</h4>
              <p className="text-gray-400 mb-8">Merrni lajmet dhe ofertat e fundit direkt në email.</p>
              <div className="flex bg-white rounded-xl p-1.5 shadow-inner">
                <input type="email" placeholder="E-mail këtu..." className="bg-transparent text-black px-4 w-full outline-none text-sm" />
                <button className="bg-[#309255] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#257443] transition">Shko</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-10 text-center text-gray-500 text-sm font-semibold">
            © 2026 <span className="text-[#309255]">EduLe</span>. Krijuar me ❤️ për një karrierë të ndritur.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Students;