
import AuthModal from "./components/AuthModal"
import useGeneralStore from "./stores/general-store"

function App() {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen)
  return (
    <div className="">
      {isLoginOpen && (
        <>
          <AuthModal />
        </>
      )}{" "}
    </div>
  )
}

export default App
