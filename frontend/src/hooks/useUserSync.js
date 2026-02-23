// useUserSync.js - FINAL VERSION
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { syncUser } from "../lib/api";

function useUserSync(isClerkLoaded, isSignedIn) {
  const { user } = useUser();
  const hasAttempted = useRef(false);

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: syncUser,
    retry: false /* Prevent infinite retries */,
    onError: (err) => {
      console.error("Sync user failed:", err.message);
      hasAttempted.current = true;
    },
    onSuccess: () => {
      hasAttempted.current = true;
    },
  });

  useEffect(() => {
    if (
      !isClerkLoaded ||
      !isSignedIn ||
      !user ||
      isPending ||
      isSuccess ||
      hasAttempted.current
    ) {
      return;
    }

    syncUserMutation({
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName || user.firstName || "Anonymous",
      imageUrl: user.imageUrl,
    });
  }, [isClerkLoaded, isSignedIn, user, isPending, isSuccess, syncUserMutation]);

  return {
    isSynced: isSuccess,
    isError,
    error,
  };
}

export default useUserSync;
