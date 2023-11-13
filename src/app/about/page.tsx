
export const metadata = {
    title: 'About',
    description: 'data scientist at work'
}
export default function about() {
    return (
        <section>
            <div> 
                <h1 className="font-bold text-5xl font-serif">About Me</h1>
                <p className="my-6">
                    Hey there, fellow data explorers! 🚀 I&apos;m Mai, your friendly neighborhood data scientist based in the vibrant city of Singapore. 
                    Think of this blog as my magical diary where I spill the beans on all the nerdy spells I&apos;ve mastered and the whimsical thoughts that pop into my head.
                    Whether it&apos;s deciphering data mysteries or having an existential crisis over a missing semicolon, this space is where I pour out my heart and code.
                    Expect a delightful blend of tech wisdom, quirky anecdotes, and the occasional data-driven dad joke.
                </p>
                <hr />
                <p className="my-6">
                    I am curious to learn deeper about machine learning, technologies and how
                    they can combine to make our world a better place.
                    <span className="dark:text-amber-400 text-blue-700"> It would make my day if you find anything interesting here. </span>
                </p>
                {/* <p className="my-6">
                    I also find great joy in the process of making things. Whether it is developing a new feature for an application or building this website from scratch, <span className="dark:text-amber-400 text-blue-700">there is something incredibly satisfying about seeing an idea come to life through code.</span>
                    I believe that the ability to create something from nothing is what sets coding apart from other fields, and the prospect of creating something that touches somebody&apos;s life
                    motivates me to continue learning and improving my skills.  I hope to share with others as I continue to grow and develop in this exciting field.
                </p> */}
            </div>
        </section>
    )
}