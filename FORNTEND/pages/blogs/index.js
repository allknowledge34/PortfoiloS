import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import Blogsearch from "@/components/Blogsearch";

export default function blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);

  const [searchQuery, setSearchQuery] = useState("");

  const { alldata, loading } = useFetchData("/api/blogs");

  const [searchInput, setSearchInput] = useState(false);

  const handleSearchOpen = () => {
    setSearchInput(!searchInput)
  }
  const handleSearchClose = () => {
    setSearchInput(false)
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const allblog = alldata.length;

  const filteredBlogs =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;

  const currnetBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastblog);

  const publishedData = currnetBlogs.filter((ab) => ab.status === "publish");

  const sliderpubdata = alldata.filter((ab) => ab.status === "publish");

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <div className="blogpage">
        <section className="tophero">
          <div className="container">
            <div className="toptitle ">
              <div className="toptitlecont flex">
                <h1>
                  Welcome to <span>Sachin Blogs!</span>
                </h1>
                <p>
                I write about web, mobile, AI, and game development, delivering the best articles, links, and news related to the latest in software engineering.
                </p>
                <div className="subemail">
                  <form className="flex">
                    <input onClick={handleSearchOpen} placeholder="search blogs here..." type="text" />
                    <button>Search</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="featured">
              <div className="container">
                <div className="border"></div>
                <div className="featuredposts">
                  <div className="fetitle flex">
                    <h3>Featured Posts :</h3>
                  </div>
                  <div className="feposts flex">
                    <Swiper
                      slidesPerView={"auto"}
                      freeMode={true}
                      spaceBetween={30}
                      className="mySwiper"
                      modules={[FreeMode]}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          {sliderpubdata.slice(0, 6).map((blog) => {
                            return (
                              <SwiperSlide key={blog._id}>
                                <div className="fpost" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" key={blog._id}>
                                  <Link href={`/blogs/${blog.slug}`}>
                                    <img
                                      src={blog.images[0]}
                                      alt={blog.title}
                                    />
                                  </Link>
                                  <div className="fpostinfo">
                                    <div className="tegs flex">
                                      {blog.blogcategory.map((cat) => {
                                        return (
                                          <Link
                                            href={`/blog/category/${cat}`}
                                            className="ai"
                                          >
                                            <span></span>
                                            {cat}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                    <h2>
                                      <Link href={`/blogs/${blog.slug}`}>
                                        {blog.title}
                                      </Link>
                                    </h2>
                                    <div className="fpostby flex">
                                      <img src="/img/coderwhite.png" alt="" />
                                      <p>By Sachin coder</p>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </>
                      )}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="populartegssec">
          <div className="container">
            <div className=" border"></div>
            <div className="populartegsdata">
              <div className="fetitle">
                <h3> Popular Tegs</h3>
              </div>
              <div className="poputegs">
                <Link href="/blog/category/Next js" className="pteg" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                  <img
                    src="https://res.cloudinary.com/drvwdwlzx/image/upload/v1743961574/sachin-admin/file_1743961552832.png"
                    alt=""
                  />
                  <div className="tegs">
                    <div className="apps ">
                      <span></span>Next Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Node js" className="pteg" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-sqAjIvOtpXI%2FXYoCmqOyMwI%2FAAAAAAAAJig%2FCowR8wgEauEs-RXN2IPmLYkC7NHoHuA3gCLcBGAsYHQ%2Fs1600%2Fnode-js-logo.png&f=1&nofb=1&ipt=150fc0483e4465a22a3e277c4648396630b73d7dd21249b50e0f27b5753e8e4f&ipo=images"
                    alt=""
                  />
                  <div className="tegs">
                    <div className="apps ">
                      <span></span>Node Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/React js" className="pteg" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2FeNAsjO55tPbgaor7ma%2Fsource.gif&f=1&nofb=1&ipt=1b6c2d1f4493f3ac96918899cd5c25eeec185ba33f30d800552d9b6a6655a8c7&ipo=images"
                    alt=""
                  />
                  <div className="tegs">
                    <div className="apps ">
                      <span></span>React Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Digital Marketing" className="pteg" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bandt.com.au%2Finformation%2Fuploads%2F2016%2F06%2Fwhat-is-digital-marketing.jpg&f=1&nofb=1&ipt=656563f849714c46144b621537bf85f7ac8acb506678f5b0679879dd602bb9b4&ipo=images"
                    alt=""
                  />
                  <div className="tegs">
                    <div className="apps ">
                      <span></span>Digital
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Flutter Dev" className="pteg" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fscholar.fidahasan.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fflutter-logo.png&f=1&nofb=1&ipt=2ea4dd59087272499663573c42b9fce58916ac50f20c7186946de0ffc23acfe1&ipo=images"
                    alt=""
                  />
                  <div className="tegs">
                    <div className="apps ">
                      <span></span>Flutters
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Tailwind css" className="pteg" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd6f6d0kpz0gyr.cloudfront.net%2Fuploads%2Fimages%2F_1200x630_crop_center-center_82_none%2Ftailwind-thumb.jpg%3Fmtime%3D1609771799&f=1&nofb=1&ipt=7905bdb27cec8eef124c91d0809bea12a463ac5d375240e052349785be22fbb9&ipo=images"
                    alt=""
                  />
                  <div className="tegs">
                    <div className="apps ">
                      <span></span>Tailwind
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="latestpostsec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>Latest Articles:</h3>
              </div>
              <div className="latestposts">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {publishedData.map((blog) => {
                      return (
                        <div className="lpost" key={blog._id}>
                          <div className="lpostimg" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                            <Link href={`/blogs/${blog.slug}`}>
                              <img src={blog.images[0]} alt={blog.title} />
                            </Link>
                            <div className="tegs">
                              {blog.blogcategory.map((cat) => {
                                return (
                                  <Link
                                    href={`/blog/category${cat}`}
                                    className="ai"
                                  >
                                    <span></span>
                                    {cat}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                          <div className="lpostinfo">
                            <h3> <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                            <p>It seems like you've referenced a phrase or text in Latin! Would you like me to interpret its meaning, refine it, or integrate it into something specific you're working on?</p>
                            <h4 className="flex"><img src="/img/coderwhite.png" alt="" /><span>by Sachin coder</span></h4>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            {publishedData.length === 0 ? ("") : (
              <div className='blogspaginationbtn flex flex -center mt-3 '>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                  <button key={number}
                    onClick={() => paginate(number)}
                    className={`${currentPage === number ? 'active' : ''}`}>
                    {number}
                  </button>
                ))}
                <button onClick={() => paginate(currentPage +1)} disabled={indexOfLastblog >= filteredBlogs.length}>
                Next</button>
              </div>
            )}
          </div>
          {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
        </section>
      </div>
    </>
  );
}
