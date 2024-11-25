import Hero from './Hero'

const AboutView = () => {
    return (
    <>
        <Hero text="About Us" />
    <div className="container">
        <div className="row">
            <div className="col-lg-8 offset-lg-2 my-5">
            <p className="lead">
            This Movie Browser started from a course as the just the barebones
            and I am currently fleshing out all of the functionality while learning React.
            </p>
            </div>
        </div>
    </div>
    </>
    )
}



export default AboutView;