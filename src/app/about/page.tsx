
export const metadata = {
    title: 'About',
    description: 'data scientist at work'
}
export default function about() {
    return (
        <section>
            <div> 
                <h1 className="font-bold text-3xl md:text-5xl font-serif">About Me</h1>
                <p className="my-6 text-sm md:text-base">
                    Hello! 🚀 I&apos;m Mai, a data scientist from Singapore.
                    Consider this blog my enchanted diary, where I share nerdy spells, whimsical thoughts, and tales of deciphering data mysteries. 
                    Join me for a blend of tech wisdom and quirky anecdotes.
                </p>
                <hr />
                <p className="my-6">
                    A cup of good coffee makes my day. Perhaps our paths will cross at a random coffee spot one day. Anyways,  
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