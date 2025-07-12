import './Testimonial.css';

const Testimonial = () => {
    return (
        <div>
            <section className="testimonial-section">
                <h1 className="testimonial-title">Testimonial</h1>
                <h2 className="testimonial-subtitle">
                    What our <span>customers</span> are saying
                </h2>

                <div className="testimonial-grid">
                    {[1, 2, 3].map((_, i) => (
                        <div className="testimonial-card-wrapper" key={i}>
                            <div className="testimonial-card">
                                <img
                                    alt="testimonial"
                                    className="testimonial-img"
                                    src={
                                        i === 0
                                            ? "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&facialHairType=BeardLight&clotheType=BlazerSweater"
                                            : i === 1
                                            ? "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Kurt&clotheType=GraphicShirt&eyeType=Happy"
                                            : "https://avataaars.io/?avatarStyle=Circle&topType=NoHair&clotheType=Hoodie&eyeType=Default&eyebrowType=Default&mouthType=Smile"
                                    }
                                />
                                <p className="testimonial-text">
                                    {i === 0
                                        ? "This platform made it super easy to find what I needed. The layout is intuitive, and the categories are well organized. Highly recommended!"
                                        : i === 1
                                        ? "Beautiful UI and smooth performance. I loved how quickly I could scroll through categories and discover new items I didn’t even know I needed."
                                        : "Clean design and flawless experience! This is one of the best shopping interfaces I’ve come across in a long time."}
                                </p>
                                <span className="testimonial-bar" />
                                <h2 className="testimonial-name">
                                    {i === 0
                                        ? "Ravi Mehra"
                                        : i === 1
                                        ? "Ankita Sharma"
                                        : "Jayant Verma"}
                                </h2>
                                <p className="testimonial-role">
                                    {i === 0
                                        ? "Digital Marketer"
                                        : i === 1
                                        ? "Product Enthusiast"
                                        : "E-commerce Strategist"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
