import connectDB from "@/_lib/mongodb";

// generic handler wrapper
export function withDB<Args extends unknown[], Return>(
  handler: (...args: Args) => Return | Promise<Return>
): (...args: Args) => Promise<Return> {
  return async (...args: Args): Promise<Return> => {
    await connectDB();
    return await handler(...args);
  };
}
