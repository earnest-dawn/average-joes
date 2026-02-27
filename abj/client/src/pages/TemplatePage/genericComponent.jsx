import React, { useEffect } from "react";

export default function elementsComponent() {
  const publicUrl = process.env.PUBLIC_URL || "";

  // Helper to load legacy scripts if you still need the HTML5UP animations
  useEffect(() => {
	const scripts = [
	  "/assets/js/jquery.min.js",
	  "/assets/js/jquery.scrollex.min.js",
	  "/assets/js/jquery.scrolly.min.js",
	  "/assets/js/browser.min.js",
	  "/assets/js/breakpoints.min.js",
	  "/assets/js/util.js",
	  "/assets/js/main.js",
	];

	scripts.forEach((src) => {
	  const script = document.createElement("script");
	  script.src = src;
	  script.async = false;
	  document.body.appendChild(script);
	});
  }, []);

  return (
	<div id="wrapper" className="fade-in">
	  {/* Intro */}
	  <div id="intro">
		<h1>Average Joe's Burgers</h1>
		<p>
		  A free, fully responsive HTML5 + CSS3 site template designed by{" "}
		  <a href="https://www.instagram.com/average_joes_burgers/">
			@average_joes_burgers
		  </a>{" "}
		  for <a href="https://html5up.net">HTML5 UP</a>
		  <br />
		  and released for free under the{" "}
		  <a href="https://html5up.net/license">Creative Commons license</a>.
		</p>
		<ul className="actions">
		  <li>
			<a
			  href="#header"
			  className="button icon solid solo fa-arrow-down scrolly"
			>
			  Continue
			</a>
		  </li>
		</ul>
	  </div>

	  {/* Header */}
	  <header id="header">
		<a href="index.html" className="logo">
		  Average Joe's Burgers
		</a>
	  </header>

	  {/* Nav */}
	  <nav id="nav">
		<ul className="links">
		  <li className="active">
			<a href="index.html">This is Massively</a>
		  </li>
		  <li>
			<a href="generic.html">Generic Page</a>
		  </li>
		  <li>
			<a href="elements.html">Elements Reference</a>
		  </li>
		</ul>
		<ul className="icons">
		  <li>
			<a href="#" className="icon brands fa-twitter">
			  <span className="label">Twitter</span>
			</a>
		  </li>
		  <li>
			<a href="#" className="icon brands fa-facebook-f">
			  <span className="label">Facebook</span>
			</a>
		  </li>
		  <li>
			<a href="#" className="icon brands fa-instagram">
			  <span className="label">Instagram</span>
			</a>
		  </li>
		  <li>
			<a href="#" className="icon brands fa-github">
			  <span className="label">GitHub</span>
			</a>
		  </li>
		</ul>
	  </nav>

	  {/* Main */}
	  <div id="main">
		{/* Featured Post */}
		<article className="post featured">
		  <header className="major">
			<span className="date">April 25, 2017</span>
			<h2>
			  <a href="#">
				And this is a
				<br />
				massive headline
			  </a>
			</h2>
			<p>
			  Aenean ornare velit lacus varius enim ullamcorper proin aliquam
			  <br />
			  facilisis ante sed etiam magna interdum congue. Lorem ipsum dolor
			  <br />
			  amet nullam sed etiam veroeros.
			</p>
		  </header>
		  <a href="#" className="image main">
			<img src={`${publicUrl}/assets/images/pic01.jpg`} alt="" />
		  </a>
		  <ul className="actions special">
			<li>
			  <a href="#" className="button large">
				Full Story
			  </a>
			</li>
		  </ul>
		</article>

		{/* Posts */}
		<section className="posts">
		  <article>
			<header>
			  <span className="date">April 24, 2017</span>
			  <h2>
				<a href="#">
				  Sed magna
				  <br />
				  ipsum faucibus
				</a>
			  </h2>
			</header>
			<a href="#" className="image fit">
			  <img src={`${publicUrl}/assets/images/pic02.jpg`} alt="" />
			</a>
			<p>
			  Donec eget ex magna. Interdum et malesuada fames ac ante ipsum
			  primis in faucibus. Pellentesque venenatis dolor imperdiet dolor
			  mattis sagittis magna etiam.
			</p>
			<ul className="actions special">
			  <li>
				<a href="#" className="button">
				  Full Story
				</a>
			  </li>
			</ul>
		  </article>
		  <article>
			<header>
			  <span className="date">April 22, 2017</span>
			  <h2>
				<a href="#">
				  Primis eget
				  <br />
				  imperdiet lorem
				</a>
			  </h2>
			</header>
			<a href="#" className="image fit">
			  <img src={`${publicUrl}/assets/images/pic03.jpg`} alt="" />
			</a>
			<p>
			  Donec eget ex magna. Interdum et malesuada fames ac ante ipsum
			  primis in faucibus. Pellentesque venenatis dolor imperdiet dolor
			  mattis sagittis magna etiam.
			</p>
			<ul className="actions special">
			  <li>
				<a href="#" className="button">
				  Full Story
				</a>
			  </li>
			</ul>
		  </article>
		  <article>
			<header>
			  <span className="date">April 18, 2017</span>
			  <h2>
				<a href="#">
				  Ante mattis
				  <br />
				  interdum dolor
				</a>
			  </h2>
			</header>
			<a href="#" className="image fit">
			  <img src={`${publicUrl}/assets/images/pic04.jpg`} alt="" />
			</a>
			<p>
			  Donec eget ex magna. Interdum et malesuada fames ac ante ipsum
			  primis in faucibus.
			</p>
			<ul className="actions special">
			  <li>
				<a href="#" className="button">
				  Full Story
				</a>
			  </li>
			</ul>
		  </article>
		  <article>
			<header>
			  <span className="date">April 14, 2017</span>
			  <h2>
				<a href="#">
				  Tempus sed
				  <br />
				  nulla imperdiet
				</a>
			  </h2>
			</header>
			<a href="#" className="image fit">
			  <img src={`${publicUrl}/assets/images/pic05.jpg`} alt="" />
			</a>
			<p>
			  Donec eget ex magna. Interdum et malesuada fames ac ante ipsum
			  primis in faucibus.
			</p>
			<ul className="actions special">
			  <li>
				<a href="#" className="button">
				  Full Story
				</a>
			  </li>
			</ul>
		  </article>
		  <article>
			<header>
			  <span className="date">April 11, 2017</span>
			  <h2>
				<a href="#">
				  Odio magna
				  <br />
				  sed consectetur
				</a>
			  </h2>
			</header>
			<a href="#" className="image fit">
			  <img src={`${publicUrl}/assets/images/pic06.jpg`} alt="" />
			</a>
			<p>
			  Donec eget ex magna. Interdum et malesuada fames ac ante ipsum
			  primis in faucibus.
			</p>
			<ul className="actions special">
			  <li>
				<a href="#" className="button">
				  Full Story
				</a>
			  </li>
			</ul>
		  </article>
		  <article>
			<header>
			  <span className="date">April 7, 2017</span>
			  <h2>
				<a href="#">
				  Augue lorem
				  <br />
				  primis vestibulum
				</a>
			  </h2>
			</header>
			<a href="#" className="image fit">
			  <img src={`${publicUrl}/assets/images/pic07.jpg`} alt="" />
			</a>
			<p>
			  Donec eget ex magna. Interdum et malesuada fames ac ante ipsum
			  primis in faucibus.
			</p>
			<ul className="actions special">
			  <li>
				<a href="#" className="button">
				  Full Story
				</a>
			  </li>
			</ul>
		  </article>
		</section>

		{/* Footer Navigation */}
		<footer>
		  <div className="pagination">
			<a href="#" className="previous">
			  Prev
			</a>
			<a href="#" className="page active">
			  1
			</a>
			<a href="#" className="page">
			  2
			</a>
			<a href="#" className="page">
			  3
			</a>
			<span className="extra">&hellip;</span>
			<a href="#" className="page">
			  8
			</a>
			<a href="#" className="page">
			  9
			</a>
			<a href="#" className="page">
			  10
			</a>
			<a href="#" className="next">
			  Next
			</a>
		  </div>
		</footer>
	  </div>

	  {/* Footer */}
	  <footer id="footer">
		<section>
		  <form method="post" action="#">
			<div className="fields">
			  <div className="field">
				<label htmlFor="name">Name</label>
				<input type="text" name="name" id="name" />
			  </div>
			  <div className="field">
				<label htmlFor="email">Email</label>
				<input type="text" name="email" id="email" />
			  </div>
			  <div className="field">
				<label htmlFor="message">Message</label>
				<textarea name="message" id="message" rows="3"></textarea>
			  </div>
			</div>
			<ul className="actions">
			  <li>
				<input type="submit" value="Send Message" />
			  </li>
			</ul>
		  </form>
		</section>
		<section className="split contact">
		  <section className="alt">
			<h3>Address</h3>
			<p>
			  1234 Somewhere Road #87257
			  <br />
			  Nashville, TN 00000-0000
			</p>
		  </section>
		  <section>
			<h3>Phone</h3>
			<p>
			  <a href="#">(000) 000-0000</a>
			</p>
		  </section>
		  <section>
			<h3>Email</h3>
			<p>
			  <a href="#">info@untitled.tld</a>
			</p>
		  </section>
		  <section>
			<h3>Social</h3>
			<ul className="icons alt">
			  <li>
				<a href="#" className="icon brands alt fa-twitter">
				  <span className="label">Twitter</span>
				</a>
			  </li>
			  <li>
				<a href="#" className="icon brands alt fa-facebook-f">
				  <span className="label">Facebook</span>
				</a>
			  </li>
			  <li>
				<a href="#" className="icon brands alt fa-instagram">
				  <span className="label">Instagram</span>
				</a>
			  </li>
			  <li>
				<a href="#" className="icon brands alt fa-github">
				  <span className="label">GitHub</span>
				</a>
			  </li>
			</ul>
		  </section>
		</section>
	  </footer>

	  {/* Copyright */}
	  <div id="copyright">
		<ul>
		  <li>&copy; Untitled</li>
		  <li>
			Design: <a href="https://html5up.net">HTML5 UP</a>
		  </li>
		</ul>
	  </div>
	</div>
  );
}