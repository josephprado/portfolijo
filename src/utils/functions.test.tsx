import { getFragment, paramRoute } from './functions';

// use toBe when comparing values
// use toEqual when comparing objects

describe('paramRoute', () => {
  test('replaces no parameters', () => {
    const route = '/a';
    const path = paramRoute(route, 'hello');
    expect(path).toBe('/a');
  });

  test('replaces one parameter', () => {
    const route = '/:param';
    const path = paramRoute(route, 'hello');
    expect(path).toBe('/hello');
  });

  test('replaces one parameter on end', () => {
    const route = '/a/:param';
    const path = paramRoute(route, 'hello');
    expect(path).toBe('/a/hello');
  });

  test('replaces two parameters', () => {
    const route = '/a/:param1/:param2';
    const path = paramRoute(route, 'hello', 'goodbye');
    expect(path).toBe('/a/hello/goodbye');
  });

  test('replaces parameters inside non-parameters', () => {
    const route = '/a/:param1/:param2/b';
    const path = paramRoute(route, 'hello', 'goodbye');
    expect(path).toBe('/a/hello/goodbye/b');
  });

  test('replaces parameters outside non-parameters', () => {
    const route = '/:param1/a/b/:param2';
    const path = paramRoute(route, 'hello', 'goodbye');
    expect(path).toBe('/hello/a/b/goodbye');
  });

  test('replaces parameters mixed with non-parameters', () => {
    const route = '/a/:param1/b/:param2/c';
    const path = paramRoute(route, 'hello', 'goodbye');
    expect(path).toBe('/a/hello/b/goodbye/c');
  });
});

describe('getFragment', () => {
  test('returns fragment', () => {
    const route = '/about#welcome';
    const fragment = getFragment(route);
    expect(fragment).toBe('welcome');
  });

  test('returns empty string if no fragment', () => {
    const route = '/about';
    const fragment = getFragment(route);
    expect(fragment).toBe('');
  });

  test('returns empty string if no test after #', () => {
    const route = '/about#';
    const fragment = getFragment(route);
    expect(fragment).toBe('');
  });

  test('returns empty string if route is empty string', () => {
    const route = '';
    const fragment = getFragment(route);
    expect(fragment).toBe('');
  });

  test('returns first fragment if text has multiple fragments', () => {
    const route = '/about#welcome#hello';
    const fragment = getFragment(route);
    expect(fragment).toBe('welcome');
  });

  test('returns fragment if route begins with #', () => {
    const route = '#welcome';
    const fragment = getFragment(route);
    expect(fragment).toBe('welcome');
  });
});
