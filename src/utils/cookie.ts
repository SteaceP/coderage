interface CookieAttributes {
  path?: string;
  domain?: string;
  expires?: number | string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None"; //? if it's not set, it will be set to "Lax" by default
  httpOnly?: boolean;
}
interface CookieMethods {
  get(name: string): string | null;
  set(name: string, value: string, attributes?: CookieAttributes): void;
  remove(name: string, attributes?: CookieAttributes): void;
}

const Cookie: CookieMethods = {
  get(name) {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  },
  set(name, value, attributes?) {
    attributes = {
      path: "/",
      ...attributes,
    };
    if (attributes.expires instanceof Date) {
      attributes.expires = attributes.expires.toUTCString();
    }
    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (const optionKey in attributes) {
      updatedCookie += "; " + optionKey;
      const optionValue = attributes[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  },
  remove(name: string, attributes?: CookieAttributes) {
    this.set(name, "", {
      ...attributes,
      expires: new Date(0),
    });
  },
};

export default Cookie;
