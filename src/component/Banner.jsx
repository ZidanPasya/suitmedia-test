function Banner(){
    return (
        <div 
            className="relative h-96 bg-cover bg-center flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: 'url("https://cdn.wallpapersafari.com/77/47/o2Jd6i.jpg")', clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 100%)' }}
        >
            <div className="text-center text-white z-10 relative">
                <h1 className="text-4xl font-bold tracking-tight">Ideas</h1>
                <p className="text-lg leading-8">Where all our great things begin</p>
            </div>
        </div>
    )
}

export default Banner
