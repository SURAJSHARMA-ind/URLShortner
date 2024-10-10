import React from "react";
import RazorpayButton from "./RazorpayButton";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  return (
    <section className=" min-h-screen h-full w-full justify-center absolute flex bg-yellow-200 bg-opacity-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-black mb-10">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <p className="text-xl text-black mb-4">$0/month</p>
              <ul className="mb-4">
                <li className="mb-2">Create short URLs</li>
              </ul>
            </div>
            <button onClick={()=>navigate('/mainscreen')} className="bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md">Start Now</button>
          </div>

          {/* Standard Plan */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Standard</h3>
              <p className="text-xl text-black mb-4">$5/month</p>
              <ul className="mb-4">
                <li className="mb-2">Create short URLs</li>
                <li className="mb-2">Make your custom URLs</li>
              </ul>
            </div>
            <RazorpayButton />
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <p className="text-xl text-black mb-4">$10/month</p>
              <ul className="mb-4">
                <li className="mb-2">Create short URLs</li>
                <li className="mb-2">Make your custom URLs</li>
                <li className="mb-2">Access URL analytics</li>
              </ul>
            </div>
            <RazorpayButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
