import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const appError = useRouteError()
  console.log(appError)

  if(appError.status === 404){
    return (
      <div className="bg-error p-8 align-element">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-error-content mb-4">Error</h1>
          <p className="text-error-content">
            Oops! Something went wrong. The page you're looking for does not exist.
            {/* Customize the error message here */}
          </p>
          <Link to='/' className="text-base-content">Back to Home Page</Link>
        </div>
      </div>
    );
  }

  return <div className="align-element m-8">Something went wrong</div>;
};

export default ErrorPage;
