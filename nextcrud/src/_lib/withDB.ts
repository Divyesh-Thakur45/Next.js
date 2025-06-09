import connectDB from "@/_lib/mongodb";

export const withDB = (handler: Function) => {
  return async function (...args: any[]) {
    await connectDB();
    return handler(...args);
  };
};

// helper function
