import { paramRoute } from './functions';

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
