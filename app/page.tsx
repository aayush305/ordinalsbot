import Navbar from './components/Navbar'

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to OrdinalsBot.</h1>
        <p>This is the home page.</p>
      </main>
    </div>
  )
}
