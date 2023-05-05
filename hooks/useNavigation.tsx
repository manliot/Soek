import { useRouter } from 'next/router';

export function useNavigation() {
  const router = useRouter();

  function navigateTo(path: string, options = {}) {
    router.push(path, undefined, options);
  }

  function navigateBack() {
    router.back();
  }

  function replaceRoute(newRoute: string) {
    router.replace(newRoute);
  }

  return {
    navigateTo,
    navigateBack,
    replaceRoute,
  };
}