import { useState, useEffect, useRef } from "react"
import axios from 'axios'

function IdeaCard() {
    const [ideas, setIdeas] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [sortOption, setSortOption] = useState("published_at")
    const [totalIdeas, setTotalIdeas] = useState(0)

    const initialState = useRef({
        currentPage: 1,
        perPage: 10,
        sortOption: "published_at",
    });

    const getIdea = async() => {
        try{
            const fetchData  = await axios.get(
                'https://suitmedia-backend.suitdev.com/api/ideas',
                {
                    params: {
                        "page[number]": currentPage,
                        "page[size]": perPage,
                        append: ["small_image", "medium_image"],
                        sort: sortOption,
                    },
                }
            )
            setIdeas(fetchData.data.data)
            setTotalIdeas(fetchData.data.meta.total)
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        initialState.current = {
          currentPage,
          perPage,
          sortOption,
        };
    }, [currentPage, perPage, sortOption]);
    
    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("ideaCardState", JSON.stringify(initialState.current));
        });

        const storedState = localStorage.getItem("ideaCardState");
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            setCurrentPage(parsedState.currentPage);
            setPerPage(parsedState.perPage);
            setSortOption(parsedState.sortOption);
        }
    }, []);

    useEffect(() => {
        getIdea()
    }, [currentPage, perPage, sortOption])

    const sortIdea = (event) => {
        setSortOption(event.target.value)
        setCurrentPage(1)
    }

    const perPageChange = (event) => {
        setPerPage(Number(event.target.value))
        setCurrentPage(1)
    }

    const countPageRange = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }

    const firstIdea = (currentPage - 1) * perPage + 1
    const lastIdea = Math.min(currentPage * perPage, totalIdeas)
    const totalIdea = Math.ceil(totalIdeas / perPage)
    const pageRange = countPageRange(Math.max(1, currentPage - 2), Math.min(totalIdea, currentPage + 2))


  return (
    <main className="mx-auto p-3 lg:px-24 mt-16">
        <div className="flex items-center justify-between mb-4">
            <p className="">Showing {firstIdea} - {lastIdea} of {totalIdeas}</p>
            <div className="flex gap-x-6">
                <div className="flex items-center gap-x-2">
                    <p>Show per page</p>
                    <select className="border border-gray-400 rounded-full py-2 pl-3 pr-14" value={perPage} onChange={perPageChange}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="flex items-center gap-x-2">
                    <p>Sort by</p>
                    <select className="border border-gray-400 rounded-full py-2 pl-3 pr-14" value={sortOption} onChange={sortIdea}>
                        <option value="published_at">Newest</option>
                        <option value="-published_at">Oldest</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-4 gap-x-6 gap-y-6 rounded-md justify-between mb-6">
            {
                ideas.map((idea) => {
                    const formatDate = new Date(idea.published_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })

                    const smallImage = idea.small_image && idea.small_image.length > 0 ? idea.small_image[0] : null
                    return (
                        <div key={idea.id}>
                            <a href={idea.link} className="cursor-pointer">
                                {
                                    smallImage && (
                                        <img 
                                            src={`${smallImage.url}?auto=format&fit=crop&w=400&q=50`}
                                            className="rounded-t-md h-40 w-full object-cover"
                                            loading="lazy"
                                        />
                                    )
                                }
                                <div className="p-3">
                                    <p className="text-sm text-gray-500">{formatDate}</p>
                                    <h2 className="line-clamp-3">{idea.title}</h2>
                                </div>
                            </a>
                        </div>
                    )
                })
            }
        </div>
        <div className=" flex justify-center">
            <ul className="list-style-none flex">
                <li>
                    <a 
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 
                            ${currentPage === 1 ? "cursor-not-allowed" : "hover:cursor-pointer"}`
                        }
                        aria-label="First-Page"
                        href="#"
                        onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage(1);
                            }
                        }}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li>
                    <a 
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 
                            ${currentPage === 1 ? "cursor-not-allowed" : "hover:cursor-pointer"}`
                        }
                        aria-label="Previous"
                        href="#"
                        onClick={() => {
                            if (currentPage > 1) {
                                setCurrentPage(currentPage - 1);
                            }
                        }}
                    >
                        <span aria-hidden="true">&lang;</span>
                    </a>
                </li>
                {
                    pageRange.map((pageNumber) => (
                        <li key={pageNumber}>
                            <a 
                                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 ${
                                    pageNumber === currentPage ? "font-bold" : ""
                                }`}
                                aria-label={`Page ${pageNumber}`}
                                href="#"
                                onClick={() => setCurrentPage(pageNumber)}
                            >
                                {pageNumber}
                            </a>
                        </li>
                    ))
                }
                <li>
                    <a
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100e ${
                            currentPage === totalIdea ? "cursor-not-allowed" : "hover:cursor-pointer"
                        }`}
                        href="#"
                        aria-label="Next"
                        onClick={() => {
                        if (currentPage < totalIdea) {
                            setCurrentPage(currentPage + 1);
                        }
                        }}
                    >
                        <span aria-hidden="true">&rang;</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100e ${
                            currentPage === totalIdea ? "cursor-not-allowed" : "hover:cursor-pointer"
                        }`}
                        href="#"
                        aria-label="Last-Page"
                        onClick={() => {
                        if (currentPage < totalIdea) {
                            setCurrentPage(totalIdea);
                        }
                        }}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
    </main>
  );
}

export default IdeaCard