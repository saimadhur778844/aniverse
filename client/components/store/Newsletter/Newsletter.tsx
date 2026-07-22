export default function Newsletter() {
  return (
    <section className="px-6 py-16 text-center">
      <h2 className="text-3xl font-bold">Stay in the loop</h2>
      <p className="mx-auto mt-3 max-w-xl text-gray-400">
        Get updates about new anime collectibles and exclusive drops.
      </p>
      <form className="mx-auto mt-6 flex max-w-lg gap-3" action="#">
        <input
          type="email"
          required
          placeholder="Your email address"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 outline-none focus:border-red-400"
        />
        <button className="rounded-full bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-500">
          Subscribe
        </button>
      </form>
    </section>
  );
}
