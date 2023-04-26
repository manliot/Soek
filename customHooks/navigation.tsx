import { useRouter } from 'next/router';

export function useNavigation() {
  const router = useRouter();

  function navigateTo(path: string, options = {}) {
    router.push(path, undefined, options);
  }

  function navigateBack() {
    router.back();
  }

  return {
    navigateTo,
    navigateBack,
  };
}

export default useNavigation;