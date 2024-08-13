const LoadingScreen = () => {
    return (
      <div
      className="justify-center items-center h-screen w-full animate-pulse fixed z-50 left-0 top-0 bg-black bg-opacity-90 flex flex-col"
      >
          <p
              className="text-lg font-medium"
          >
              Loading...
          </p>
      </div>
    );
  };
  
  export default LoadingScreen;