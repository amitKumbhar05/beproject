export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-muted-foreground">
              Our mission is to provide advanced object detection and blurring solutions for sensitive video content. We
              understand the importance of privacy and security in today's digital world, especially when dealing with
              military and sensitive footage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Technology</h2>
            <p className="text-muted-foreground mb-4">
              We leverage state-of-the-art artificial intelligence and machine learning algorithms to detect and blur
              objects in video content with high precision. Our technology is constantly evolving to improve accuracy
              and performance.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Advanced object detection models trained on diverse datasets</li>
              <li>Real-time processing capabilities for efficient workflow</li>
              <li>Customizable blurring options to meet specific requirements</li>
              <li>Secure and private processing with end-to-end encryption</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Team</h2>
            <p className="text-muted-foreground">
              Our team consists of experts in computer vision, machine learning, and software development. With years of
              experience in the field, we are dedicated to providing the best solutions for our clients' needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
            <p className="text-muted-foreground">
              We are committed to maintaining the highest standards of quality, security, and privacy. We continuously
              improve our technology to ensure that our clients receive the best possible service.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

