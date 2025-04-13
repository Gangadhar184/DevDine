import React from 'react';

const Shimmer = () => {
    const shimmerCards = Array(20).fill(null);

    return (
        <div className="flex flex-wrap gap-4 justify-center mt-6">
            {shimmerCards.map((_, index) => (
                <div
                    key={index}
                    className="w-full sm:w-[45%] md:w-[30%] lg:w-64 h-72 rounded-lg bg-[#1e293b] overflow-hidden relative animate-pulse"
                >
                   
                    <div className="h-40 w-full bg-[#334155]"></div>

                  
                    <div className="p-3 space-y-3">
                        <div className="h-5 w-3/4 bg-[#334155] rounded"></div>
                        <div className="h-4 w-full bg-[#334155] rounded"></div>

                        <div className="flex justify-between">
                            <div className="h-4 w-16 bg-[#334155] rounded"></div>
                            <div className="h-4 w-24 bg-[#334155] rounded"></div>
                        </div>

                        <div className="h-4 w-1/2 bg-[#334155] rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Shimmer;
