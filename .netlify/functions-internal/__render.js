var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser2 = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser2.onPartBegin = function() {
    parser2.onPartData = onPartData;
    parser2.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser2.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser2.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser2.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser2.onPartData = appendToFile;
        parser2.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser2.write(chunk);
  }
  parser2.end();
  return formData;
}
var import_node_fs, import_node_path, import_node_worker_threads, import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    init_shims();
    import_node_fs = __toModule(require("node:fs"));
    import_node_path = __toModule(require("node:path"));
    import_node_worker_threads = __toModule(require("node:worker_threads"));
    init_install_fetch();
    import_node_http = __toModule(require("node:http"));
    import_node_https = __toModule(require("node:https"));
    import_node_zlib = __toModule(require("node:zlib"));
    import_node_stream = __toModule(require("node:stream"));
    import_node_util = __toModule(require("node:util"));
    import_node_url = __toModule(require("node:url"));
    import_net = __toModule(require("net"));
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index: index2, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name2) => {
          this[name2 + "Mark"] = i2;
        };
        const clear = (name2) => {
          delete this[name2 + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name2, clear2) => {
          const markSymbol = name2 + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name2, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name2, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index2 === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index2++;
                break;
              } else if (index2 - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index2 = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index2 + 2]) {
                index2 = -2;
              }
              if (c === boundary[index2 + 2]) {
                index2++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index2 = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index2++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index2 === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index2;
              if (index2 === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index2 < boundary.length) {
                if (boundary[index2] === c) {
                  if (index2 === 0) {
                    dataCallback("onPartData", true);
                  }
                  index2++;
                } else {
                  index2 = 0;
                }
              } else if (index2 === boundary.length) {
                index2++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index2 = 0;
                }
              } else if (index2 - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index2 = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index2 = 0;
                  }
                } else {
                  index2 = 0;
                }
              }
              if (index2 > 0) {
                lookbehind[index2 - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index2;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta2 = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta2[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta2.length; i2++) {
    if (meta2[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta2[i2]}`;
      if (meta2[i2].indexOf("charset=") === 0) {
        charset = meta2[i2].substring(8);
      }
    }
  }
  if (!meta2[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream2.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name2, value]) => {
    try {
      validateHeaderName(name2);
      validateHeaderValue(name2, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net2.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options: options2 } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https2.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib2.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib2.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createGunzip(zlibOptions), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflate(), reject) : (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflateRaw(), reject);
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createBrotliDecompress(), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
var import_node_http2, import_node_https2, import_node_zlib2, import_node_stream2, import_node_util2, import_node_url2, import_net2, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _Blob, Blob2, Blob$1, _File, File, t, i, h, r, m, f2, e, x, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers, redirectStatus, isRedirect, INTERNALS$1, Response, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    init_shims();
    import_node_http2 = __toModule(require("node:http"));
    import_node_https2 = __toModule(require("node:https"));
    import_node_zlib2 = __toModule(require("node:zlib"));
    import_node_stream2 = __toModule(require("node:stream"));
    import_node_util2 = __toModule(require("node:util"));
    import_node_url2 = __toModule(require("node:url"));
    import_net2 = __toModule(require("net"));
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name2) {
          return new TypeError("Cannot " + name2 + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name2) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name2} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name2) {
          return new TypeError(`ReadableStreamAsyncIterator.${name2} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair2 = container._queue.shift();
          container._queueTotalSize -= pair2.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair2.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair2 = container._queue.peek();
          return pair2.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry = this._queue.shift();
              this._queueTotalSize -= entry.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name2) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name2} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name2) {
          return new TypeError(`ReadableByteStreamController.prototype.${name2} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name2) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name2} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name2) {
          return new TypeError(`WritableStream.prototype.${name2} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name2) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name2} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name2) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name2} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name2) {
          return new TypeError("Cannot " + name2 + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name2) {
            this.message = message || "";
            this.name = name2 || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name2) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name2} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options2, context) {
          assertDictionary(options2, context);
          const mode = options2 === null || options2 === void 0 ? void 0 : options2.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options2, context) {
          assertDictionary(options2, context);
          const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options2, context) {
          assertDictionary(options2, context);
          const preventAbort = options2 === null || options2 === void 0 ? void 0 : options2.preventAbort;
          const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
          const preventClose = options2 === null || options2 === void 0 ? void 0 : options2.preventClose;
          const signal = options2 === null || options2 === void 0 ? void 0 : options2.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair2, context) {
          assertDictionary(pair2, context);
          const readable = pair2 === null || pair2 === void 0 ? void 0 : pair2.readable;
          assertRequiredField(readable, "readable", "ReadableWritablePair");
          assertReadableStream(readable, `${context} has member 'readable' that`);
          const writable3 = pair2 === null || pair2 === void 0 ? void 0 : pair2.writable;
          assertRequiredField(writable3, "writable", "ReadableWritablePair");
          assertWritableStream(writable3, `${context} has member 'writable' that`);
          return { readable, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options2 = convertReaderOptions(rawOptions, "First parameter");
            if (options2.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options2 = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options2;
            try {
              options2 = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options2 = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options2.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name2) {
          return new TypeError(`ReadableStream.prototype.${name2} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options2) {
            assertRequiredArgument(options2, 1, "ByteLengthQueuingStrategy");
            options2 = convertQueuingStrategyInit(options2, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options2.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name2) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name2} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options2) {
            assertRequiredArgument(options2, 1, "CountQueuingStrategy");
            options2 = convertQueuingStrategyInit(options2, "First parameter");
            this._countQueuingStrategyHighWaterMark = options2.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name2) {
          return new TypeError(`CountQueuingStrategy.prototype.${name2} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === "erroring") {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable._state === "errored") {
              throw readable._storedError;
            }
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name2) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name2} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name2) {
          return new TypeError(`TransformStream.prototype.${name2} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob3 } = require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name2(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      constructor(blobParts = [], options2 = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options2 !== "object" && typeof options2 !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options2 === null)
          options2 = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder.encode(element);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        const type = options2.type === void 0 ? "" : String(options2.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    Blob$1 = Blob2;
    _File = class File2 extends Blob$1 {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options2 = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options2);
        if (options2 === null)
          options2 = {};
        const lastModified = options2.lastModified === void 0 ? Date.now() : Number(options2.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    };
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util2.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream2.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream2.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream2.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream2.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name2, value] of parameters) {
            formData.append(name2, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util2.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream2.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream2.PassThrough({ highWaterMark });
        p2 = new import_node_stream2.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util2.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util2.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream2.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http2.default.validateHeaderName === "function" ? import_node_http2.default.validateHeaderName : (name2) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name2)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name2}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http2.default.validateHeaderValue === "function" ? import_node_http2.default.validateHeaderValue : (name2, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name2}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers) {
          const raw = init2.raw();
          for (const [name2, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name2, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util2.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair2) => {
              if (typeof pair2 !== "object" || import_node_util2.types.isBoxedPrimitive(pair2)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair2];
            }).map((pair2) => {
              if (pair2.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair2];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name2, value]) => {
          validateHeaderName(name2);
          validateHeaderValue(name2, String(value));
          return [String(name2).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name2, value) => {
                  validateHeaderName(name2);
                  validateHeaderValue(name2, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name2).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name2) => {
                  validateHeaderName(name2);
                  return URLSearchParams.prototype[p].call(target, String(name2).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name2) {
        const values = this.getAll(name2);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name2)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name2 of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name2), name2, this]);
        }
      }
      *values() {
        for (const name2 of this.keys()) {
          yield this.get(name2);
        }
      }
      *entries() {
        for (const name2 of this.keys()) {
          yield [name2, this.get(name2)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response = class extends Body {
      constructor(body = null, options2 = {}) {
        super(body, options2);
        const status = options2.status != null ? options2.status : 200;
        const headers = new Headers(options2.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options2.url,
          status,
          statusText: options2.statusText || "",
          headers,
          counter: options2.counter,
          highWaterMark: options2.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url2.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options2 = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options: options2
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/@sveltejs/adapter-netlify/files/shims.js
var init_shims = __esm({
  "node_modules/@sveltejs/adapter-netlify/files/shims.js"() {
    init_install_fetch();
  }
});

// node_modules/@sveltejs/kit/dist/chunks/url.js
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function resolve(base3, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base3);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base3}"`);
  }
  const baseparts = path_match ? [] : base3.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
var absolute, scheme;
var init_url = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/url.js"() {
    init_shims();
    absolute = /^([a-z]+:)?\/?\//;
    scheme = /^[a-z]+:/;
  }
});

// node_modules/@sveltejs/kit/dist/chunks/error.js
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var init_error = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/error.js"() {
    init_shims();
  }
});

// node_modules/@sveltejs/kit/dist/ssr.js
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s3) {
  return typeof s3 === "string" || s3 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler2) {
    return;
  }
  const params = route.params(match);
  const response = await handler2({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i2) {
    names.set(entry[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name2, thing) {
      params_1.push(name2);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name2 + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name2 + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name2 + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name2 + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name2 = "";
  do {
    name2 = chars[num % chars.length] + name2;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name2) ? name2 + "_" : name2;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop2() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function writable(value, start = noop2) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function escape_json_string_in_html(str) {
  return escape(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
function escape_html_attr(str) {
  return '"' + escape(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape(str, dict, unicode_encoder) {
  let result = "";
  for (let i2 = 0; i2 < str.length; i2 += 1) {
    const char = str.charAt(i2);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i2];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css6 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css6.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content2) => styles.add(content2));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css6).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
    init2 += options2.service_worker ? '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>' : "";
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${page && page.path ? try_serialize(page.path, (error3) => {
      throw new Error(`Failed to serialize page.path: ${error3.message}`);
    }) : null},
						query: new URLSearchParams(${page && page.query ? s$1(page.query.toString()) : ""}),
						params: ${page && page.params ? try_serialize(page.params, (error3) => {
      throw new Error(`Failed to serialize page.params: ${error3.message}`);
    }) : null}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker && !options2.amp) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  let body = rendered.html;
  if (options2.amp) {
    if (options2.service_worker) {
      body += `<amp-install-serviceworker src="${options2.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    body += serialized_data.map(({ url, body: body2, json }) => {
      let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url)}`;
      if (body2)
        attributes += ` data-body="${hash(body2)}"`;
      return `<script ${attributes}>${json}<\/script>`;
    }).join("\n\n	");
  }
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name: name2, message, stack } = error2;
    serialized = try_serialize({ ...error2, name: name2, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const prefix = options2.paths.assets || options2.paths.base;
        const filename = (resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (is_root_relative(resolved)) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s2(response2.statusText)},"headers":${s2(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: { ...stuff }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id2) => id2 ? options2.load_component(id2) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {}
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i2 === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options2.handle_error(e2, request);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const error_node = await options2.load_component(route.b[i2]);
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options2.handle_error(e2, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name2, value] = raw_header.split(": ");
      name2 = name2.toLowerCase();
      headers[name2] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name3, value2] = raw_directive.split("=");
        directives[name3] = JSON.parse(value2);
      });
      if (name2 === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                let if_none_match_value = request2.headers["if-none-match"];
                if (if_none_match_value?.startsWith('W/"')) {
                  if_none_match_value = if_none_match_value.substring(2);
                }
                const etag = `"${hash(response.body || "")}"`;
                if (if_none_match_value === etag) {
                  return {
                    status: 304,
                    headers: {}
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e2 = coalesce_to_error(err);
    options2.handle_error(e2, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e2.stack : e2.message
    };
  }
}
var chars, unsafeChars, reserved, escaped, objectProtoOwnPropertyNames, subscriber_queue, escape_json_string_in_html_dict, escape_html_attr_dict, s$1, s2, ReadOnlyFormData;
var init_ssr = __esm({
  "node_modules/@sveltejs/kit/dist/ssr.js"() {
    init_shims();
    init_url();
    init_error();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
    escaped = {
      "<": "\\u003C",
      ">": "\\u003E",
      "/": "\\u002F",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    Promise.resolve();
    subscriber_queue = [];
    escape_json_string_in_html_dict = {
      '"': '\\"',
      "<": "\\u003C",
      ">": "\\u003E",
      "/": "\\u002F",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    escape_html_attr_dict = {
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    };
    s$1 = JSON.stringify;
    s2 = JSON.stringify;
    ReadOnlyFormData = class {
      #map;
      constructor(map) {
        this.#map = map;
      }
      get(key) {
        const value = this.#map.get(key);
        return value && value[0];
      }
      getAll(key) {
        return this.#map.get(key);
      }
      has(key) {
        return this.#map.has(key);
      }
      *[Symbol.iterator]() {
        for (const [key, value] of this.#map) {
          for (let i2 = 0; i2 < value.length; i2 += 1) {
            yield [key, value[i2]];
          }
        }
      }
      *entries() {
        for (const [key, value] of this.#map) {
          for (let i2 = 0; i2 < value.length; i2 += 1) {
            yield [key, value[i2]];
          }
        }
      }
      *keys() {
        for (const [key] of this.#map)
          yield key;
      }
      *values() {
        for (const [, value] of this.#map) {
          for (let i2 = 0; i2 < value.length; i2 += 1) {
            yield value[i2];
          }
        }
      }
    };
  }
});

// .svelte-kit/output/server/chunks/__layout-0079a1b8.js
var layout_0079a1b8_exports = {};
__export(layout_0079a1b8_exports, {
  default: () => _layout
});
var _layout;
var init_layout_0079a1b8 = __esm({
  ".svelte-kit/output/server/chunks/__layout-0079a1b8.js"() {
    init_shims();
    init_app_17a768d9();
    init_ssr();
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `${$$result.title = `<title>Codic</title>`, ""}`, ""}
${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/chunks/error-5bb8475e.js
var error_5bb8475e_exports = {};
__export(error_5bb8475e_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_5bb8475e = __esm({
  ".svelte-kit/output/server/chunks/error-5bb8475e.js"() {
    init_shims();
    init_app_17a768d9();
    init_ssr();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape2(status)}</h1>

<pre>${escape2(error2.message)}</pre>



${error2.frame ? `<pre>${escape2(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape2(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/chunks/Clock.svelte_svelte_type_style_lang-3b557eeb.js
var css, IconBase;
var init_Clock_svelte_svelte_type_style_lang_3b557eeb = __esm({
  ".svelte-kit/output/server/chunks/Clock.svelte_svelte_type_style_lang-3b557eeb.js"() {
    init_shims();
    init_app_17a768d9();
    css = {
      code: "svg.svelte-c8tyih{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}",
      map: null
    };
    IconBase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { title = null } = $$props;
      let { viewBox } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
        $$bindings.viewBox(viewBox);
      $$result.css.add(css);
      return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("viewBox", viewBox, 0)} class="${"svelte-c8tyih"}">${title ? `<title>${escape2(title)}</title>` : ``}${slots.default ? slots.default({}) : ``}</svg>`;
    });
  }
});

// .svelte-kit/output/server/chunks/stores-8f888745.js
function writable2(value, start = noop3) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue2, openedIndex, favorites;
var init_stores_8f888745 = __esm({
  ".svelte-kit/output/server/chunks/stores-8f888745.js"() {
    init_shims();
    init_app_17a768d9();
    subscriber_queue2 = [];
    openedIndex = writable2(0);
    favorites = writable2([]);
  }
});

// .svelte-kit/output/server/chunks/index-f73b8040.js
var index_f73b8040_exports = {};
__export(index_f73b8040_exports, {
  default: () => Routes
});
var css$1, Typewriter, FaRegPauseCircle, Accordion, FaChevronDown, index, AccordionItem, FaGithub, css2, Routes;
var init_index_f73b8040 = __esm({
  ".svelte-kit/output/server/chunks/index-f73b8040.js"() {
    init_shims();
    init_app_17a768d9();
    init_Clock_svelte_svelte_type_style_lang_3b557eeb();
    init_stores_8f888745();
    init_ssr();
    css$1 = {
      code: "@keyframes svelte-x8atzo-cursorFade{0%,100%{opacity:1}50%{opacity:0}}.typewriter-container.svelte-x8atzo *:not(.typing):not(.finished-typing):not([data-static]){display:none}.typewriter-container.svelte-x8atzo .finished-typing::after{content:none}.cursor.svelte-x8atzo .typing::after{content:'\u258C';display:inline-block;color:var(--cursor-color);animation:svelte-x8atzo-cursorFade 1.25s infinite}.delay.svelte-x8atzo{visibility:hidden}",
      map: null
    };
    Typewriter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let options2;
      let { interval = 30 } = $$props;
      let { cascade = false } = $$props;
      let { loop: loop2 = false } = $$props;
      let { loopRandom = false } = $$props;
      let { scramble = false } = $$props;
      let { scrambleSlowdown = scramble ? true : false } = $$props;
      let { cursor = true } = $$props;
      let { delay = 0 } = $$props;
      const dispatch = createEventDispatcher();
      if ($$props.interval === void 0 && $$bindings.interval && interval !== void 0)
        $$bindings.interval(interval);
      if ($$props.cascade === void 0 && $$bindings.cascade && cascade !== void 0)
        $$bindings.cascade(cascade);
      if ($$props.loop === void 0 && $$bindings.loop && loop2 !== void 0)
        $$bindings.loop(loop2);
      if ($$props.loopRandom === void 0 && $$bindings.loopRandom && loopRandom !== void 0)
        $$bindings.loopRandom(loopRandom);
      if ($$props.scramble === void 0 && $$bindings.scramble && scramble !== void 0)
        $$bindings.scramble(scramble);
      if ($$props.scrambleSlowdown === void 0 && $$bindings.scrambleSlowdown && scrambleSlowdown !== void 0)
        $$bindings.scrambleSlowdown(scrambleSlowdown);
      if ($$props.cursor === void 0 && $$bindings.cursor && cursor !== void 0)
        $$bindings.cursor(cursor);
      if ($$props.delay === void 0 && $$bindings.delay && delay !== void 0)
        $$bindings.delay(delay);
      $$result.css.add(css$1);
      options2 = {
        interval,
        cascade,
        loop: loop2,
        loopRandom,
        scramble,
        scrambleSlowdown,
        cursor,
        delay,
        dispatch
      };
      return `<div class="${[
        "typewriter-container svelte-x8atzo",
        (cursor ? "cursor" : "") + " " + (options2.delay > 0 ? "delay" : "")
      ].join(" ").trim()}" style="${"--cursor-color: " + escape2(typeof cursor === "string" ? cursor : "black")}">${slots.default ? slots.default({}) : ``}</div>`;
    });
    FaRegPauseCircle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 512 512" }, $$props), {}, {
        default: () => `<path d="${"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm96-280v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16zm-112 0v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16z"}"></path>`
      })}`;
    });
    Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $openedIndex, $$unsubscribe_openedIndex;
      $$unsubscribe_openedIndex = subscribe(openedIndex, (value) => $openedIndex = value);
      let { openIndex = void 0 } = $$props;
      set_store_value(openedIndex, $openedIndex = openIndex, $openedIndex);
      if ($$props.openIndex === void 0 && $$bindings.openIndex && openIndex !== void 0)
        $$bindings.openIndex(openIndex);
      $$unsubscribe_openedIndex();
      return `${slots.default ? slots.default({}) : ``}`;
    });
    FaChevronDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 448 512" }, $$props), {}, {
        default: () => `<path d="${"M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"}"></path>`
      })}`;
    });
    index = 0;
    AccordionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $openedIndex, $$unsubscribe_openedIndex;
      $$unsubscribe_openedIndex = subscribe(openedIndex, (value) => $openedIndex = value);
      const thisIndex = index++;
      let opened = false;
      let { title } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      {
        if (thisIndex === $openedIndex) {
          opened = true;
        } else {
          opened = false;
        }
      }
      $$unsubscribe_openedIndex();
      return `<div class="${"cursor-pointer bg-blue-400 w-full md:w-[75%] px-[20px] py-[10px] flex justify-between items-center mb-[10px] text-[0.9em]"}" role="${"button"}" tabindex="${"0"}"><h1 class="${"m-0 text-3xl font-bold"}">${escape2(title)}</h1>
	<i class="${"transition-transform duration-500 w-4"}"${add_attribute("style", opened ? "transform: rotate(180deg);" : "", 0)}>${validate_component(FaChevronDown, "ChevronDown").$$render($$result, {}, {}, {})}</i></div>
${opened ? `<div class="${"mb-[20px]"}">${slots.default ? slots.default({}) : ``}</div>` : ``}`;
    });
    FaGithub = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 496 512" }, $$props), {}, {
        default: () => `<path d="${"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"}"></path>`
      })}`;
    });
    css2 = {
      code: "#grid-container.svelte-1i3swnm{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;grid-gap:10px}@keyframes svelte-1i3swnm-up-down{0%{opacity:0;transform:translateY(-50px)}25%,75%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(50px)}}#music.svelte-1i3swnm{animation-name:svelte-1i3swnm-up-down;animation-duration:1500ms;animation-iteration-count:infinite}",
      map: null
    };
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css2);
      return `${`<div class="${"flex flex-col max-w-[100%] overflow-x-hidden overflow-y-hidden"}"><button class="${"bg-blue-400 p-3 font-bold rounded-md absolute top-3 right-3"}">Start Codicing \u2192</button>
		<div class="${"flex items-center justify-center"}"><h1 class="${"font-bold text-8xl md:text-9xl"}">Codic</h1></div>
		<div class="${"flex text-2xl md:text-5xl justify-center mt-5 group items-baseline"}"><p>Combining</p>
			\xA0
			${`${validate_component(Typewriter, "Typewriter").$$render($$result, { interval: 300, loop: true }, {}, { default: () => `<p>Coding</p>` })}`}
			\xA0and\xA0
			<p id="${"music"}" style="${"animation-play-state: " + escape2("running") + ";"}" class="${"svelte-1i3swnm"}">Music
			</p>
			\xA0\xA0
			<button class="${"opacity-0 group-hover:opacity-100 transition-all duration-200 w-[0.75em]"}">${`${validate_component(FaRegPauseCircle, "Pause").$$render($$result, {}, {}, {})}`}</button></div>
		<br><br>
		<div id="${"grid-container"}" class="${"p-2 svelte-1i3swnm"}"><p class="${"text-xl md:text-3xl row-start-1 col-start-1 text-right"}">Search for your favorite artist and presss the play button on any song, Codic will do the
				rest! Listen to the songs continuously while you code and weave the next great product.
			</p>
			<img src="${"/musicPanel.jpg"}" alt="${"Music Panel"}" class="${"border-dashed border-2 border-yellow-400 row-start-1 col-start-2"}">
			<img src="${"/editor.jpg"}" alt="${"Editor"}" class="${"border-dashed border-2 border-yellow-400 row-start-2 col-start-1"}">
			<p class="${"text-xl md:text-3xl row-start-2 col-start-2 text-left"}">Code in an integrated editor with javascript support with an integrated console. Enjoy the
				dark mode and put less stress on your eyes!
			</p></div>
		<div class="${"flex flex-col items-center mt-2 gap-2 mb-5"}"><video controls class="${"w-[75%] border-dashed border-2 border-yellow-400"}"><source src="${"/resize.mp4"}"><track kind="${"captions"}"></video>
			<p class="${"text-xl md:text-3xl row-start-2 col-start-2 text-center"}">Easily resize and snap the music panel and the editor.
			</p></div>
		<hr>
		<div class="${"flex flex-col items-center mt-5 gap-2 mb-5"}"><h1 class="${"font-bold text-3xl md:text-5xl mb- mb-5"}">Recommended Configuration</h1>
			<video controls class="${"w-[75%] border-dashed border-2 border-yellow-400"}"><source src="${"/config.mp4"}"><track kind="${"captions"}"></video>
			<p class="${"text-xl md:text-3xl row-start-2 col-start-2 text-center"}">Search for your favorite artist, start playing any song, hide the music panel and you are
				good to go! Listen to music without interruptions and code simultaneously with distractions.
			</p></div>
		<hr>
		<div class="${"flex flex-col items-center mt-5 gap-2 mb-5"}"><h1 class="${"font-bold text-3xl md:text-5xl mb- mb-5"}">Cool New Features Coming Soon</h1>
			${validate_component(Accordion, "Accordion").$$render($$result, {}, {}, {
        default: () => `${validate_component(AccordionItem, "AccordionItem").$$render($$result, { title: "Complete IDE Integration" }, {}, {
          default: () => `<p class="${"text-xl md:text-2xl row-start-2 col-start-2 text-center"}">A complete VS Code like IDE with file system and extensions.
					</p>`
        })}
				${validate_component(AccordionItem, "AccordionItem").$$render($$result, { title: "More Programming Languages" }, {}, {
          default: () => `<p class="${"text-xl md:text-2xl row-start-2 col-start-2 text-center"}">More programming languages including Python, Go, Ruby etc.
					</p>`
        })}
				${validate_component(AccordionItem, "AccordionItem").$$render($$result, { title: "Accounts Integration" }, {}, {
          default: () => `<p class="${"text-xl md:text-2xl row-start-2 col-start-2 text-center"}">Save your code and favorite songs online on the cloud.
					</p>`
        })}`
      })}</div>
		<div class="${"w-full flex justify-center items-center bg-yellow-400 p-2 gap-2"}"><h3 class="${"font-bold text-xl"}">Made by Sumanyu Aggarwal</h3>
			<a href="${"https://github.com/SuPythony/Codic"}" class="${"w-5 cursor-pointer"}">${validate_component(FaGithub, "Github").$$render($$result, {}, {}, {})}</a></div></div>`}`;
    });
  }
});

// node_modules/@codemirror/text/dist/index.js
function isExtendingChar(code) {
  for (let i2 = 1; i2 < extend.length; i2 += 2)
    if (extend[i2] > code)
      return extend[i2 - 1] <= code;
  return false;
}
function isRegionalIndicator(code) {
  return code >= 127462 && code <= 127487;
}
function findClusterBreak(str, pos, forward = true) {
  return (forward ? nextClusterBreak : prevClusterBreak)(str, pos);
}
function nextClusterBreak(str, pos) {
  if (pos == str.length)
    return pos;
  if (pos && surrogateLow(str.charCodeAt(pos)) && surrogateHigh(str.charCodeAt(pos - 1)))
    pos--;
  let prev = codePointAt(str, pos);
  pos += codePointSize(prev);
  while (pos < str.length) {
    let next = codePointAt(str, pos);
    if (prev == ZWJ || next == ZWJ || isExtendingChar(next)) {
      pos += codePointSize(next);
      prev = next;
    } else if (isRegionalIndicator(next)) {
      let countBefore = 0, i2 = pos - 2;
      while (i2 >= 0 && isRegionalIndicator(codePointAt(str, i2))) {
        countBefore++;
        i2 -= 2;
      }
      if (countBefore % 2 == 0)
        break;
      else
        pos += 2;
    } else {
      break;
    }
  }
  return pos;
}
function prevClusterBreak(str, pos) {
  while (pos > 0) {
    let found = nextClusterBreak(str, pos - 2);
    if (found < pos)
      return found;
    pos--;
  }
  return 0;
}
function surrogateLow(ch) {
  return ch >= 56320 && ch < 57344;
}
function surrogateHigh(ch) {
  return ch >= 55296 && ch < 56320;
}
function codePointAt(str, pos) {
  let code0 = str.charCodeAt(pos);
  if (!surrogateHigh(code0) || pos + 1 == str.length)
    return code0;
  let code1 = str.charCodeAt(pos + 1);
  if (!surrogateLow(code1))
    return code0;
  return (code0 - 55296 << 10) + (code1 - 56320) + 65536;
}
function codePointSize(code) {
  return code < 65536 ? 1 : 2;
}
function findColumn(string2, col, tabSize, strict) {
  for (let i2 = 0, n = 0; ; ) {
    if (n >= col)
      return i2;
    if (i2 == string2.length)
      break;
    n += string2.charCodeAt(i2) == 9 ? tabSize - n % tabSize : 1;
    i2 = findClusterBreak(string2, i2);
  }
  return strict === true ? -1 : string2.length;
}
function textLength(text) {
  let length = -1;
  for (let line of text)
    length += line.length + 1;
  return length;
}
function appendText(text, target, from = 0, to = 1e9) {
  for (let pos = 0, i2 = 0, first = true; i2 < text.length && pos <= to; i2++) {
    let line = text[i2], end = pos + line.length;
    if (end >= from) {
      if (end > to)
        line = line.slice(0, to - pos);
      if (pos < from)
        line = line.slice(from - pos);
      if (first) {
        target[target.length - 1] += line;
        first = false;
      } else
        target.push(line);
    }
    pos = end + 1;
  }
  return target;
}
function sliceText(text, from, to) {
  return appendText(text, [""], from, to);
}
var extend, ZWJ, Text, TextLeaf, TextNode, RawTextCursor, PartialTextCursor, LineCursor, Line;
var init_dist = __esm({
  "node_modules/@codemirror/text/dist/index.js"() {
    init_shims();
    extend = /* @__PURE__ */ "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((s3) => s3 ? parseInt(s3, 36) : 1);
    for (let i2 = 1; i2 < extend.length; i2++)
      extend[i2] += extend[i2 - 1];
    ZWJ = 8205;
    Text = class {
      constructor() {
      }
      lineAt(pos) {
        if (pos < 0 || pos > this.length)
          throw new RangeError(`Invalid position ${pos} in document of length ${this.length}`);
        return this.lineInner(pos, false, 1, 0);
      }
      line(n) {
        if (n < 1 || n > this.lines)
          throw new RangeError(`Invalid line number ${n} in ${this.lines}-line document`);
        return this.lineInner(n, true, 1, 0);
      }
      replace(from, to, text) {
        let parts = [];
        this.decompose(0, from, parts, 2);
        if (text.length)
          text.decompose(0, text.length, parts, 1 | 2);
        this.decompose(to, this.length, parts, 1);
        return TextNode.from(parts, this.length - (to - from) + text.length);
      }
      append(other) {
        return this.replace(this.length, this.length, other);
      }
      slice(from, to = this.length) {
        let parts = [];
        this.decompose(from, to, parts, 0);
        return TextNode.from(parts, to - from);
      }
      eq(other) {
        if (other == this)
          return true;
        if (other.length != this.length || other.lines != this.lines)
          return false;
        let start = this.scanIdentical(other, 1), end = this.length - this.scanIdentical(other, -1);
        let a = new RawTextCursor(this), b = new RawTextCursor(other);
        for (let skip = start, pos = start; ; ) {
          a.next(skip);
          b.next(skip);
          skip = 0;
          if (a.lineBreak != b.lineBreak || a.done != b.done || a.value != b.value)
            return false;
          pos += a.value.length;
          if (a.done || pos >= end)
            return true;
        }
      }
      iter(dir = 1) {
        return new RawTextCursor(this, dir);
      }
      iterRange(from, to = this.length) {
        return new PartialTextCursor(this, from, to);
      }
      iterLines(from, to) {
        let inner;
        if (from == null) {
          inner = this.iter();
        } else {
          if (to == null)
            to = this.lines + 1;
          let start = this.line(from).from;
          inner = this.iterRange(start, Math.max(start, to == this.lines + 1 ? this.length : to <= 1 ? 0 : this.line(to - 1).to));
        }
        return new LineCursor(inner);
      }
      toString() {
        return this.sliceString(0);
      }
      toJSON() {
        let lines = [];
        this.flatten(lines);
        return lines;
      }
      static of(text) {
        if (text.length == 0)
          throw new RangeError("A document must have at least one line");
        if (text.length == 1 && !text[0])
          return Text.empty;
        return text.length <= 32 ? new TextLeaf(text) : TextNode.from(TextLeaf.split(text, []));
      }
    };
    TextLeaf = class extends Text {
      constructor(text, length = textLength(text)) {
        super();
        this.text = text;
        this.length = length;
      }
      get lines() {
        return this.text.length;
      }
      get children() {
        return null;
      }
      lineInner(target, isLine, line, offset) {
        for (let i2 = 0; ; i2++) {
          let string2 = this.text[i2], end = offset + string2.length;
          if ((isLine ? line : end) >= target)
            return new Line(offset, end, line, string2);
          offset = end + 1;
          line++;
        }
      }
      decompose(from, to, target, open) {
        let text = from <= 0 && to >= this.length ? this : new TextLeaf(sliceText(this.text, from, to), Math.min(to, this.length) - Math.max(0, from));
        if (open & 1) {
          let prev = target.pop();
          let joined = appendText(text.text, prev.text.slice(), 0, text.length);
          if (joined.length <= 32) {
            target.push(new TextLeaf(joined, prev.length + text.length));
          } else {
            let mid = joined.length >> 1;
            target.push(new TextLeaf(joined.slice(0, mid)), new TextLeaf(joined.slice(mid)));
          }
        } else {
          target.push(text);
        }
      }
      replace(from, to, text) {
        if (!(text instanceof TextLeaf))
          return super.replace(from, to, text);
        let lines = appendText(this.text, appendText(text.text, sliceText(this.text, 0, from)), to);
        let newLen = this.length + text.length - (to - from);
        if (lines.length <= 32)
          return new TextLeaf(lines, newLen);
        return TextNode.from(TextLeaf.split(lines, []), newLen);
      }
      sliceString(from, to = this.length, lineSep = "\n") {
        let result = "";
        for (let pos = 0, i2 = 0; pos <= to && i2 < this.text.length; i2++) {
          let line = this.text[i2], end = pos + line.length;
          if (pos > from && i2)
            result += lineSep;
          if (from < end && to > pos)
            result += line.slice(Math.max(0, from - pos), to - pos);
          pos = end + 1;
        }
        return result;
      }
      flatten(target) {
        for (let line of this.text)
          target.push(line);
      }
      scanIdentical() {
        return 0;
      }
      static split(text, target) {
        let part = [], len = -1;
        for (let line of text) {
          part.push(line);
          len += line.length + 1;
          if (part.length == 32) {
            target.push(new TextLeaf(part, len));
            part = [];
            len = -1;
          }
        }
        if (len > -1)
          target.push(new TextLeaf(part, len));
        return target;
      }
    };
    TextNode = class extends Text {
      constructor(children, length) {
        super();
        this.children = children;
        this.length = length;
        this.lines = 0;
        for (let child of children)
          this.lines += child.lines;
      }
      lineInner(target, isLine, line, offset) {
        for (let i2 = 0; ; i2++) {
          let child = this.children[i2], end = offset + child.length, endLine = line + child.lines - 1;
          if ((isLine ? endLine : end) >= target)
            return child.lineInner(target, isLine, line, offset);
          offset = end + 1;
          line = endLine + 1;
        }
      }
      decompose(from, to, target, open) {
        for (let i2 = 0, pos = 0; pos <= to && i2 < this.children.length; i2++) {
          let child = this.children[i2], end = pos + child.length;
          if (from <= end && to >= pos) {
            let childOpen = open & ((pos <= from ? 1 : 0) | (end >= to ? 2 : 0));
            if (pos >= from && end <= to && !childOpen)
              target.push(child);
            else
              child.decompose(from - pos, to - pos, target, childOpen);
          }
          pos = end + 1;
        }
      }
      replace(from, to, text) {
        if (text.lines < this.lines)
          for (let i2 = 0, pos = 0; i2 < this.children.length; i2++) {
            let child = this.children[i2], end = pos + child.length;
            if (from >= pos && to <= end) {
              let updated = child.replace(from - pos, to - pos, text);
              let totalLines = this.lines - child.lines + updated.lines;
              if (updated.lines < totalLines >> 5 - 1 && updated.lines > totalLines >> 5 + 1) {
                let copy = this.children.slice();
                copy[i2] = updated;
                return new TextNode(copy, this.length - (to - from) + text.length);
              }
              return super.replace(pos, end, updated);
            }
            pos = end + 1;
          }
        return super.replace(from, to, text);
      }
      sliceString(from, to = this.length, lineSep = "\n") {
        let result = "";
        for (let i2 = 0, pos = 0; i2 < this.children.length && pos <= to; i2++) {
          let child = this.children[i2], end = pos + child.length;
          if (pos > from && i2)
            result += lineSep;
          if (from < end && to > pos)
            result += child.sliceString(from - pos, to - pos, lineSep);
          pos = end + 1;
        }
        return result;
      }
      flatten(target) {
        for (let child of this.children)
          child.flatten(target);
      }
      scanIdentical(other, dir) {
        if (!(other instanceof TextNode))
          return 0;
        let length = 0;
        let [iA, iB, eA, eB] = dir > 0 ? [0, 0, this.children.length, other.children.length] : [this.children.length - 1, other.children.length - 1, -1, -1];
        for (; ; iA += dir, iB += dir) {
          if (iA == eA || iB == eB)
            return length;
          let chA = this.children[iA], chB = other.children[iB];
          if (chA != chB)
            return length + chA.scanIdentical(chB, dir);
          length += chA.length + 1;
        }
      }
      static from(children, length = children.reduce((l, ch) => l + ch.length + 1, -1)) {
        let lines = 0;
        for (let ch of children)
          lines += ch.lines;
        if (lines < 32) {
          let flat = [];
          for (let ch of children)
            ch.flatten(flat);
          return new TextLeaf(flat, length);
        }
        let chunk = Math.max(32, lines >> 5), maxChunk = chunk << 1, minChunk = chunk >> 1;
        let chunked = [], currentLines = 0, currentLen = -1, currentChunk = [];
        function add(child) {
          let last;
          if (child.lines > maxChunk && child instanceof TextNode) {
            for (let node of child.children)
              add(node);
          } else if (child.lines > minChunk && (currentLines > minChunk || !currentLines)) {
            flush();
            chunked.push(child);
          } else if (child instanceof TextLeaf && currentLines && (last = currentChunk[currentChunk.length - 1]) instanceof TextLeaf && child.lines + last.lines <= 32) {
            currentLines += child.lines;
            currentLen += child.length + 1;
            currentChunk[currentChunk.length - 1] = new TextLeaf(last.text.concat(child.text), last.length + 1 + child.length);
          } else {
            if (currentLines + child.lines > chunk)
              flush();
            currentLines += child.lines;
            currentLen += child.length + 1;
            currentChunk.push(child);
          }
        }
        function flush() {
          if (currentLines == 0)
            return;
          chunked.push(currentChunk.length == 1 ? currentChunk[0] : TextNode.from(currentChunk, currentLen));
          currentLen = -1;
          currentLines = currentChunk.length = 0;
        }
        for (let child of children)
          add(child);
        flush();
        return chunked.length == 1 ? chunked[0] : new TextNode(chunked, length);
      }
    };
    Text.empty = /* @__PURE__ */ new TextLeaf([""], 0);
    RawTextCursor = class {
      constructor(text, dir = 1) {
        this.dir = dir;
        this.done = false;
        this.lineBreak = false;
        this.value = "";
        this.nodes = [text];
        this.offsets = [dir > 0 ? 1 : (text instanceof TextLeaf ? text.text.length : text.children.length) << 1];
      }
      nextInner(skip, dir) {
        this.done = this.lineBreak = false;
        for (; ; ) {
          let last = this.nodes.length - 1;
          let top2 = this.nodes[last], offsetValue = this.offsets[last], offset = offsetValue >> 1;
          let size = top2 instanceof TextLeaf ? top2.text.length : top2.children.length;
          if (offset == (dir > 0 ? size : 0)) {
            if (last == 0) {
              this.done = true;
              this.value = "";
              return this;
            }
            if (dir > 0)
              this.offsets[last - 1]++;
            this.nodes.pop();
            this.offsets.pop();
          } else if ((offsetValue & 1) == (dir > 0 ? 0 : 1)) {
            this.offsets[last] += dir;
            if (skip == 0) {
              this.lineBreak = true;
              this.value = "\n";
              return this;
            }
            skip--;
          } else if (top2 instanceof TextLeaf) {
            let next = top2.text[offset + (dir < 0 ? -1 : 0)];
            this.offsets[last] += dir;
            if (next.length > Math.max(0, skip)) {
              this.value = skip == 0 ? next : dir > 0 ? next.slice(skip) : next.slice(0, next.length - skip);
              return this;
            }
            skip -= next.length;
          } else {
            let next = top2.children[offset + (dir < 0 ? -1 : 0)];
            if (skip > next.length) {
              skip -= next.length;
              this.offsets[last] += dir;
            } else {
              if (dir < 0)
                this.offsets[last]--;
              this.nodes.push(next);
              this.offsets.push(dir > 0 ? 1 : (next instanceof TextLeaf ? next.text.length : next.children.length) << 1);
            }
          }
        }
      }
      next(skip = 0) {
        if (skip < 0) {
          this.nextInner(-skip, -this.dir);
          skip = this.value.length;
        }
        return this.nextInner(skip, this.dir);
      }
    };
    PartialTextCursor = class {
      constructor(text, start, end) {
        this.value = "";
        this.done = false;
        this.cursor = new RawTextCursor(text, start > end ? -1 : 1);
        this.pos = start > end ? text.length : 0;
        this.from = Math.min(start, end);
        this.to = Math.max(start, end);
      }
      nextInner(skip, dir) {
        if (dir < 0 ? this.pos <= this.from : this.pos >= this.to) {
          this.value = "";
          this.done = true;
          return this;
        }
        skip += Math.max(0, dir < 0 ? this.pos - this.to : this.from - this.pos);
        let limit = dir < 0 ? this.pos - this.from : this.to - this.pos;
        if (skip > limit)
          skip = limit;
        limit -= skip;
        let { value } = this.cursor.next(skip);
        this.pos += (value.length + skip) * dir;
        this.value = value.length <= limit ? value : dir < 0 ? value.slice(value.length - limit) : value.slice(0, limit);
        this.done = !this.value;
        return this;
      }
      next(skip = 0) {
        if (skip < 0)
          skip = Math.max(skip, this.from - this.pos);
        else if (skip > 0)
          skip = Math.min(skip, this.to - this.pos);
        return this.nextInner(skip, this.cursor.dir);
      }
      get lineBreak() {
        return this.cursor.lineBreak && this.value != "";
      }
    };
    LineCursor = class {
      constructor(inner) {
        this.inner = inner;
        this.afterBreak = true;
        this.value = "";
        this.done = false;
      }
      next(skip = 0) {
        let { done, lineBreak, value } = this.inner.next(skip);
        if (done) {
          this.done = true;
          this.value = "";
        } else if (lineBreak) {
          if (this.afterBreak) {
            this.value = "";
          } else {
            this.afterBreak = true;
            this.next();
          }
        } else {
          this.value = value;
          this.afterBreak = false;
        }
        return this;
      }
      get lineBreak() {
        return false;
      }
    };
    if (typeof Symbol != "undefined") {
      Text.prototype[Symbol.iterator] = function() {
        return this.iter();
      };
      RawTextCursor.prototype[Symbol.iterator] = PartialTextCursor.prototype[Symbol.iterator] = LineCursor.prototype[Symbol.iterator] = function() {
        return this;
      };
    }
    Line = class {
      constructor(from, to, number2, text) {
        this.from = from;
        this.to = to;
        this.number = number2;
        this.text = text;
      }
      get length() {
        return this.to - this.from;
      }
    };
  }
});

// node_modules/@codemirror/state/dist/index.js
function addSection(sections, len, ins, forceJoin = false) {
  if (len == 0 && ins <= 0)
    return;
  let last = sections.length - 2;
  if (last >= 0 && ins <= 0 && ins == sections[last + 1])
    sections[last] += len;
  else if (len == 0 && sections[last] == 0)
    sections[last + 1] += ins;
  else if (forceJoin) {
    sections[last] += len;
    sections[last + 1] += ins;
  } else
    sections.push(len, ins);
}
function addInsert(values, sections, value) {
  if (value.length == 0)
    return;
  let index2 = sections.length - 2 >> 1;
  if (index2 < values.length) {
    values[values.length - 1] = values[values.length - 1].append(value);
  } else {
    while (values.length < index2)
      values.push(Text.empty);
    values.push(value);
  }
}
function iterChanges(desc, f3, individual) {
  let inserted = desc.inserted;
  for (let posA = 0, posB = 0, i2 = 0; i2 < desc.sections.length; ) {
    let len = desc.sections[i2++], ins = desc.sections[i2++];
    if (ins < 0) {
      posA += len;
      posB += len;
    } else {
      let endA = posA, endB = posB, text = Text.empty;
      for (; ; ) {
        endA += len;
        endB += ins;
        if (ins && inserted)
          text = text.append(inserted[i2 - 2 >> 1]);
        if (individual || i2 == desc.sections.length || desc.sections[i2 + 1] < 0)
          break;
        len = desc.sections[i2++];
        ins = desc.sections[i2++];
      }
      f3(posA, endA, posB, endB, text);
      posA = endA;
      posB = endB;
    }
  }
}
function mapSet(setA, setB, before, mkSet = false) {
  let sections = [], insert2 = mkSet ? [] : null;
  let a = new SectionIter(setA), b = new SectionIter(setB);
  for (let posA = 0, posB = 0; ; ) {
    if (a.ins == -1) {
      posA += a.len;
      a.next();
    } else if (b.ins == -1 && posB < posA) {
      let skip = Math.min(b.len, posA - posB);
      b.forward(skip);
      addSection(sections, skip, -1);
      posB += skip;
    } else if (b.ins >= 0 && (a.done || posB < posA || posB == posA && (b.len < a.len || b.len == a.len && !before))) {
      addSection(sections, b.ins, -1);
      while (posA > posB && !a.done && posA + a.len < posB + b.len) {
        posA += a.len;
        a.next();
      }
      posB += b.len;
      b.next();
    } else if (a.ins >= 0) {
      let len = 0, end = posA + a.len;
      for (; ; ) {
        if (b.ins >= 0 && posB > posA && posB + b.len < end) {
          len += b.ins;
          posB += b.len;
          b.next();
        } else if (b.ins == -1 && posB < end) {
          let skip = Math.min(b.len, end - posB);
          len += skip;
          b.forward(skip);
          posB += skip;
        } else {
          break;
        }
      }
      addSection(sections, len, a.ins);
      if (insert2)
        addInsert(insert2, sections, a.text);
      posA = end;
      a.next();
    } else if (a.done && b.done) {
      return insert2 ? new ChangeSet(sections, insert2) : new ChangeDesc(sections);
    } else {
      throw new Error("Mismatched change set lengths");
    }
  }
}
function composeSets(setA, setB, mkSet = false) {
  let sections = [];
  let insert2 = mkSet ? [] : null;
  let a = new SectionIter(setA), b = new SectionIter(setB);
  for (let open = false; ; ) {
    if (a.done && b.done) {
      return insert2 ? new ChangeSet(sections, insert2) : new ChangeDesc(sections);
    } else if (a.ins == 0) {
      addSection(sections, a.len, 0, open);
      a.next();
    } else if (b.len == 0 && !b.done) {
      addSection(sections, 0, b.ins, open);
      if (insert2)
        addInsert(insert2, sections, b.text);
      b.next();
    } else if (a.done || b.done) {
      throw new Error("Mismatched change set lengths");
    } else {
      let len = Math.min(a.len2, b.len), sectionLen = sections.length;
      if (a.ins == -1) {
        let insB = b.ins == -1 ? -1 : b.off ? 0 : b.ins;
        addSection(sections, len, insB, open);
        if (insert2 && insB)
          addInsert(insert2, sections, b.text);
      } else if (b.ins == -1) {
        addSection(sections, a.off ? 0 : a.len, len, open);
        if (insert2)
          addInsert(insert2, sections, a.textBit(len));
      } else {
        addSection(sections, a.off ? 0 : a.len, b.off ? 0 : b.ins, open);
        if (insert2 && !b.off)
          addInsert(insert2, sections, b.text);
      }
      open = (a.ins > len || b.ins >= 0 && b.len > len) && (open || sections.length > sectionLen);
      a.forward2(len);
      b.forward(len);
    }
  }
}
function normalized(ranges, mainIndex = 0) {
  let main = ranges[mainIndex];
  ranges.sort((a, b) => a.from - b.from);
  mainIndex = ranges.indexOf(main);
  for (let i2 = 1; i2 < ranges.length; i2++) {
    let range2 = ranges[i2], prev = ranges[i2 - 1];
    if (range2.empty ? range2.from <= prev.to : range2.from < prev.to) {
      let from = prev.from, to = Math.max(range2.to, prev.to);
      if (i2 <= mainIndex)
        mainIndex--;
      ranges.splice(--i2, 2, range2.anchor > range2.head ? EditorSelection.range(to, from) : EditorSelection.range(from, to));
    }
  }
  return new EditorSelection(ranges, mainIndex);
}
function checkSelection(selection, docLength) {
  for (let range2 of selection.ranges)
    if (range2.to > docLength)
      throw new RangeError("Selection points outside of document");
}
function sameArray(a, b) {
  return a == b || a.length == b.length && a.every((e2, i2) => e2 === b[i2]);
}
function compareArray(a, b, compare2) {
  if (a.length != b.length)
    return false;
  for (let i2 = 0; i2 < a.length; i2++)
    if (!compare2(a[i2], b[i2]))
      return false;
  return true;
}
function dynamicFacetSlot(addresses, facet, providers) {
  let providerAddrs = providers.map((p) => addresses[p.id]);
  let providerTypes = providers.map((p) => p.type);
  let dynamic = providerAddrs.filter((p) => !(p & 1));
  let idx = addresses[facet.id] >> 1;
  return (state, tr) => {
    let oldVal = state.values[idx], changed = oldVal === Uninitialized || !tr;
    for (let dynAddr of dynamic) {
      if (ensureAddr(state, dynAddr) & 1)
        changed = true;
    }
    if (!changed)
      return 0;
    let values = [];
    for (let i2 = 0; i2 < providerAddrs.length; i2++) {
      let value2 = getAddr(state, providerAddrs[i2]);
      if (providerTypes[i2] == 2)
        for (let val of value2)
          values.push(val);
      else
        values.push(value2);
    }
    let value = facet.combine(values);
    if (oldVal !== Uninitialized && facet.compare(value, oldVal))
      return 0;
    state.values[idx] = value;
    return 1;
  };
}
function prec(value) {
  return (ext) => new PrecExtension(ext, value);
}
function flatten(extension, compartments, newCompartments) {
  let result = [[], [], [], [], []];
  let seen = new Map();
  function inner(ext, prec2) {
    let known = seen.get(ext);
    if (known != null) {
      if (known >= prec2)
        return;
      let found = result[known].indexOf(ext);
      if (found > -1)
        result[known].splice(found, 1);
      if (ext instanceof CompartmentInstance)
        newCompartments.delete(ext.compartment);
    }
    seen.set(ext, prec2);
    if (Array.isArray(ext)) {
      for (let e2 of ext)
        inner(e2, prec2);
    } else if (ext instanceof CompartmentInstance) {
      if (newCompartments.has(ext.compartment))
        throw new RangeError(`Duplicate use of compartment in extensions`);
      let content2 = compartments.get(ext.compartment) || ext.inner;
      newCompartments.set(ext.compartment, content2);
      inner(content2, prec2);
    } else if (ext instanceof PrecExtension) {
      inner(ext.inner, ext.prec);
    } else if (ext instanceof StateField) {
      result[prec2].push(ext);
      if (ext.provides)
        inner(ext.provides, prec2);
    } else if (ext instanceof FacetProvider) {
      result[prec2].push(ext);
      if (ext.facet.extensions)
        inner(ext.facet.extensions, prec2);
    } else {
      let content2 = ext.extension;
      if (!content2)
        throw new Error(`Unrecognized extension value in extension set (${ext}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      inner(content2, prec2);
    }
  }
  inner(extension, Prec_.default);
  return result.reduce((a, b) => a.concat(b));
}
function ensureAddr(state, addr) {
  if (addr & 1)
    return 2;
  let idx = addr >> 1;
  let status = state.status[idx];
  if (status == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (status & 2)
    return status;
  state.status[idx] = 4;
  let changed = state.config.dynamicSlots[idx](state, state.applying);
  return state.status[idx] = 2 | changed;
}
function getAddr(state, addr) {
  return addr & 1 ? state.config.staticValues[addr >> 1] : state.values[addr >> 1];
}
function joinRanges(a, b) {
  let result = [];
  for (let iA = 0, iB = 0; ; ) {
    let from, to;
    if (iA < a.length && (iB == b.length || b[iB] >= a[iA])) {
      from = a[iA++];
      to = a[iA++];
    } else if (iB < b.length) {
      from = b[iB++];
      to = b[iB++];
    } else
      return result;
    if (!result.length || result[result.length - 1] < from)
      result.push(from, to);
    else if (result[result.length - 1] < to)
      result[result.length - 1] = to;
  }
}
function mergeTransaction(a, b, sequential) {
  var _a;
  let mapForA, mapForB, changes;
  if (sequential) {
    mapForA = b.changes;
    mapForB = ChangeSet.empty(b.changes.length);
    changes = a.changes.compose(b.changes);
  } else {
    mapForA = b.changes.map(a.changes);
    mapForB = a.changes.mapDesc(b.changes, true);
    changes = a.changes.compose(mapForA);
  }
  return {
    changes,
    selection: b.selection ? b.selection.map(mapForB) : (_a = a.selection) === null || _a === void 0 ? void 0 : _a.map(mapForA),
    effects: StateEffect.mapEffects(a.effects, mapForA).concat(StateEffect.mapEffects(b.effects, mapForB)),
    annotations: a.annotations.length ? a.annotations.concat(b.annotations) : b.annotations,
    scrollIntoView: a.scrollIntoView || b.scrollIntoView
  };
}
function resolveTransactionInner(state, spec, docSize) {
  let sel = spec.selection, annotations = asArray(spec.annotations);
  if (spec.userEvent)
    annotations = annotations.concat(Transaction.userEvent.of(spec.userEvent));
  return {
    changes: spec.changes instanceof ChangeSet ? spec.changes : ChangeSet.of(spec.changes || [], docSize, state.facet(lineSeparator)),
    selection: sel && (sel instanceof EditorSelection ? sel : EditorSelection.single(sel.anchor, sel.head)),
    effects: asArray(spec.effects),
    annotations,
    scrollIntoView: !!spec.scrollIntoView
  };
}
function resolveTransaction(state, specs, filter) {
  let s3 = resolveTransactionInner(state, specs.length ? specs[0] : {}, state.doc.length);
  if (specs.length && specs[0].filter === false)
    filter = false;
  for (let i2 = 1; i2 < specs.length; i2++) {
    if (specs[i2].filter === false)
      filter = false;
    let seq = !!specs[i2].sequential;
    s3 = mergeTransaction(s3, resolveTransactionInner(state, specs[i2], seq ? s3.changes.newLength : state.doc.length), seq);
  }
  let tr = new Transaction(state, s3.changes, s3.selection, s3.effects, s3.annotations, s3.scrollIntoView);
  return extendTransaction(filter ? filterTransaction(tr) : tr);
}
function filterTransaction(tr) {
  let state = tr.startState;
  let result = true;
  for (let filter of state.facet(changeFilter)) {
    let value = filter(tr);
    if (value === false) {
      result = false;
      break;
    }
    if (Array.isArray(value))
      result = result === true ? value : joinRanges(result, value);
  }
  if (result !== true) {
    let changes, back;
    if (result === false) {
      back = tr.changes.invertedDesc;
      changes = ChangeSet.empty(state.doc.length);
    } else {
      let filtered = tr.changes.filter(result);
      changes = filtered.changes;
      back = filtered.filtered.invertedDesc;
    }
    tr = new Transaction(state, changes, tr.selection && tr.selection.map(back), StateEffect.mapEffects(tr.effects, back), tr.annotations, tr.scrollIntoView);
  }
  let filters = state.facet(transactionFilter);
  for (let i2 = filters.length - 1; i2 >= 0; i2--) {
    let filtered = filters[i2](tr);
    if (filtered instanceof Transaction)
      tr = filtered;
    else if (Array.isArray(filtered) && filtered.length == 1 && filtered[0] instanceof Transaction)
      tr = filtered[0];
    else
      tr = resolveTransaction(state, asArray(filtered), false);
  }
  return tr;
}
function extendTransaction(tr) {
  let state = tr.startState, extenders = state.facet(transactionExtender), spec = tr;
  for (let i2 = extenders.length - 1; i2 >= 0; i2--) {
    let extension = extenders[i2](tr);
    if (extension && Object.keys(extension).length)
      spec = mergeTransaction(tr, resolveTransactionInner(state, extension, tr.changes.newLength), true);
  }
  return spec == tr ? tr : new Transaction(state, tr.changes, tr.selection, spec.effects, spec.annotations, spec.scrollIntoView);
}
function asArray(value) {
  return value == null ? none : Array.isArray(value) ? value : [value];
}
function hasWordChar(str) {
  if (wordChar)
    return wordChar.test(str);
  for (let i2 = 0; i2 < str.length; i2++) {
    let ch = str[i2];
    if (/\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch)))
      return true;
  }
  return false;
}
function makeCategorizer(wordChars) {
  return (char) => {
    if (!/\S/.test(char))
      return CharCategory.Space;
    if (hasWordChar(char))
      return CharCategory.Word;
    for (let i2 = 0; i2 < wordChars.length; i2++)
      if (char.indexOf(wordChars[i2]) > -1)
        return CharCategory.Word;
    return CharCategory.Other;
  };
}
var DefaultSplit, MapMode, ChangeDesc, ChangeSet, SectionIter, SelectionRange, EditorSelection, nextID, Facet, FacetProvider, initField, StateField, Prec_, Prec, PrecExtension, Compartment, CompartmentInstance, Configuration, Uninitialized, languageData, allowMultipleSelections, lineSeparator, changeFilter, transactionFilter, transactionExtender, readOnly, Annotation, AnnotationType, StateEffectType, StateEffect, Transaction, none, CharCategory, nonASCIISingleCaseWordChar, wordChar, EditorState;
var init_dist2 = __esm({
  "node_modules/@codemirror/state/dist/index.js"() {
    init_shims();
    init_dist();
    init_dist();
    DefaultSplit = /\r\n?|\n/;
    MapMode = /* @__PURE__ */ function(MapMode2) {
      MapMode2[MapMode2["Simple"] = 0] = "Simple";
      MapMode2[MapMode2["TrackDel"] = 1] = "TrackDel";
      MapMode2[MapMode2["TrackBefore"] = 2] = "TrackBefore";
      MapMode2[MapMode2["TrackAfter"] = 3] = "TrackAfter";
      return MapMode2;
    }(MapMode || (MapMode = {}));
    ChangeDesc = class {
      constructor(sections) {
        this.sections = sections;
      }
      get length() {
        let result = 0;
        for (let i2 = 0; i2 < this.sections.length; i2 += 2)
          result += this.sections[i2];
        return result;
      }
      get newLength() {
        let result = 0;
        for (let i2 = 0; i2 < this.sections.length; i2 += 2) {
          let ins = this.sections[i2 + 1];
          result += ins < 0 ? this.sections[i2] : ins;
        }
        return result;
      }
      get empty() {
        return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
      }
      iterGaps(f3) {
        for (let i2 = 0, posA = 0, posB = 0; i2 < this.sections.length; ) {
          let len = this.sections[i2++], ins = this.sections[i2++];
          if (ins < 0) {
            f3(posA, posB, len);
            posB += len;
          } else {
            posB += ins;
          }
          posA += len;
        }
      }
      iterChangedRanges(f3, individual = false) {
        iterChanges(this, f3, individual);
      }
      get invertedDesc() {
        let sections = [];
        for (let i2 = 0; i2 < this.sections.length; ) {
          let len = this.sections[i2++], ins = this.sections[i2++];
          if (ins < 0)
            sections.push(len, ins);
          else
            sections.push(ins, len);
        }
        return new ChangeDesc(sections);
      }
      composeDesc(other) {
        return this.empty ? other : other.empty ? this : composeSets(this, other);
      }
      mapDesc(other, before = false) {
        return other.empty ? this : mapSet(this, other, before);
      }
      mapPos(pos, assoc = -1, mode = MapMode.Simple) {
        let posA = 0, posB = 0;
        for (let i2 = 0; i2 < this.sections.length; ) {
          let len = this.sections[i2++], ins = this.sections[i2++], endA = posA + len;
          if (ins < 0) {
            if (endA > pos)
              return posB + (pos - posA);
            posB += len;
          } else {
            if (mode != MapMode.Simple && endA >= pos && (mode == MapMode.TrackDel && posA < pos && endA > pos || mode == MapMode.TrackBefore && posA < pos || mode == MapMode.TrackAfter && endA > pos))
              return null;
            if (endA > pos || endA == pos && assoc < 0 && !len)
              return pos == posA || assoc < 0 ? posB : posB + ins;
            posB += ins;
          }
          posA = endA;
        }
        if (pos > posA)
          throw new RangeError(`Position ${pos} is out of range for changeset of length ${posA}`);
        return posB;
      }
      touchesRange(from, to = from) {
        for (let i2 = 0, pos = 0; i2 < this.sections.length && pos <= to; ) {
          let len = this.sections[i2++], ins = this.sections[i2++], end = pos + len;
          if (ins >= 0 && pos <= to && end >= from)
            return pos < from && end > to ? "cover" : true;
          pos = end;
        }
        return false;
      }
      toString() {
        let result = "";
        for (let i2 = 0; i2 < this.sections.length; ) {
          let len = this.sections[i2++], ins = this.sections[i2++];
          result += (result ? " " : "") + len + (ins >= 0 ? ":" + ins : "");
        }
        return result;
      }
      toJSON() {
        return this.sections;
      }
      static fromJSON(json) {
        if (!Array.isArray(json) || json.length % 2 || json.some((a) => typeof a != "number"))
          throw new RangeError("Invalid JSON representation of ChangeDesc");
        return new ChangeDesc(json);
      }
    };
    ChangeSet = class extends ChangeDesc {
      constructor(sections, inserted) {
        super(sections);
        this.inserted = inserted;
      }
      apply(doc2) {
        if (this.length != doc2.length)
          throw new RangeError("Applying change set to a document with the wrong length");
        iterChanges(this, (fromA, toA, fromB, _toB, text) => doc2 = doc2.replace(fromB, fromB + (toA - fromA), text), false);
        return doc2;
      }
      mapDesc(other, before = false) {
        return mapSet(this, other, before, true);
      }
      invert(doc2) {
        let sections = this.sections.slice(), inserted = [];
        for (let i2 = 0, pos = 0; i2 < sections.length; i2 += 2) {
          let len = sections[i2], ins = sections[i2 + 1];
          if (ins >= 0) {
            sections[i2] = ins;
            sections[i2 + 1] = len;
            let index2 = i2 >> 1;
            while (inserted.length < index2)
              inserted.push(Text.empty);
            inserted.push(len ? doc2.slice(pos, pos + len) : Text.empty);
          }
          pos += len;
        }
        return new ChangeSet(sections, inserted);
      }
      compose(other) {
        return this.empty ? other : other.empty ? this : composeSets(this, other, true);
      }
      map(other, before = false) {
        return other.empty ? this : mapSet(this, other, before, true);
      }
      iterChanges(f3, individual = false) {
        iterChanges(this, f3, individual);
      }
      get desc() {
        return new ChangeDesc(this.sections);
      }
      filter(ranges) {
        let resultSections = [], resultInserted = [], filteredSections = [];
        let iter = new SectionIter(this);
        done:
          for (let i2 = 0, pos = 0; ; ) {
            let next = i2 == ranges.length ? 1e9 : ranges[i2++];
            while (pos < next || pos == next && iter.len == 0) {
              if (iter.done)
                break done;
              let len = Math.min(iter.len, next - pos);
              addSection(filteredSections, len, -1);
              let ins = iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0;
              addSection(resultSections, len, ins);
              if (ins > 0)
                addInsert(resultInserted, resultSections, iter.text);
              iter.forward(len);
              pos += len;
            }
            let end = ranges[i2++];
            while (pos < end) {
              if (iter.done)
                break done;
              let len = Math.min(iter.len, end - pos);
              addSection(resultSections, len, -1);
              addSection(filteredSections, len, iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0);
              iter.forward(len);
              pos += len;
            }
          }
        return {
          changes: new ChangeSet(resultSections, resultInserted),
          filtered: new ChangeDesc(filteredSections)
        };
      }
      toJSON() {
        let parts = [];
        for (let i2 = 0; i2 < this.sections.length; i2 += 2) {
          let len = this.sections[i2], ins = this.sections[i2 + 1];
          if (ins < 0)
            parts.push(len);
          else if (ins == 0)
            parts.push([len]);
          else
            parts.push([len].concat(this.inserted[i2 >> 1].toJSON()));
        }
        return parts;
      }
      static of(changes, length, lineSep) {
        let sections = [], inserted = [], pos = 0;
        let total = null;
        function flush(force = false) {
          if (!force && !sections.length)
            return;
          if (pos < length)
            addSection(sections, length - pos, -1);
          let set = new ChangeSet(sections, inserted);
          total = total ? total.compose(set.map(total)) : set;
          sections = [];
          inserted = [];
          pos = 0;
        }
        function process2(spec) {
          if (Array.isArray(spec)) {
            for (let sub of spec)
              process2(sub);
          } else if (spec instanceof ChangeSet) {
            if (spec.length != length)
              throw new RangeError(`Mismatched change set length (got ${spec.length}, expected ${length})`);
            flush();
            total = total ? total.compose(spec.map(total)) : spec;
          } else {
            let { from, to = from, insert: insert2 } = spec;
            if (from > to || from < 0 || to > length)
              throw new RangeError(`Invalid change range ${from} to ${to} (in doc of length ${length})`);
            let insText = !insert2 ? Text.empty : typeof insert2 == "string" ? Text.of(insert2.split(lineSep || DefaultSplit)) : insert2;
            let insLen = insText.length;
            if (from == to && insLen == 0)
              return;
            if (from < pos)
              flush();
            if (from > pos)
              addSection(sections, from - pos, -1);
            addSection(sections, to - from, insLen);
            addInsert(inserted, sections, insText);
            pos = to;
          }
        }
        process2(changes);
        flush(!total);
        return total;
      }
      static empty(length) {
        return new ChangeSet(length ? [length, -1] : [], []);
      }
      static fromJSON(json) {
        if (!Array.isArray(json))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        let sections = [], inserted = [];
        for (let i2 = 0; i2 < json.length; i2++) {
          let part = json[i2];
          if (typeof part == "number") {
            sections.push(part, -1);
          } else if (!Array.isArray(part) || typeof part[0] != "number" || part.some((e2, i3) => i3 && typeof e2 != "string")) {
            throw new RangeError("Invalid JSON representation of ChangeSet");
          } else if (part.length == 1) {
            sections.push(part[0], 0);
          } else {
            while (inserted.length < i2)
              inserted.push(Text.empty);
            inserted[i2] = Text.of(part.slice(1));
            sections.push(part[0], inserted[i2].length);
          }
        }
        return new ChangeSet(sections, inserted);
      }
    };
    SectionIter = class {
      constructor(set) {
        this.set = set;
        this.i = 0;
        this.next();
      }
      next() {
        let { sections } = this.set;
        if (this.i < sections.length) {
          this.len = sections[this.i++];
          this.ins = sections[this.i++];
        } else {
          this.len = 0;
          this.ins = -2;
        }
        this.off = 0;
      }
      get done() {
        return this.ins == -2;
      }
      get len2() {
        return this.ins < 0 ? this.len : this.ins;
      }
      get text() {
        let { inserted } = this.set, index2 = this.i - 2 >> 1;
        return index2 >= inserted.length ? Text.empty : inserted[index2];
      }
      textBit(len) {
        let { inserted } = this.set, index2 = this.i - 2 >> 1;
        return index2 >= inserted.length && !len ? Text.empty : inserted[index2].slice(this.off, len == null ? void 0 : this.off + len);
      }
      forward(len) {
        if (len == this.len)
          this.next();
        else {
          this.len -= len;
          this.off += len;
        }
      }
      forward2(len) {
        if (this.ins == -1)
          this.forward(len);
        else if (len == this.ins)
          this.next();
        else {
          this.ins -= len;
          this.off += len;
        }
      }
    };
    SelectionRange = class {
      constructor(from, to, flags) {
        this.from = from;
        this.to = to;
        this.flags = flags;
      }
      get anchor() {
        return this.flags & 16 ? this.to : this.from;
      }
      get head() {
        return this.flags & 16 ? this.from : this.to;
      }
      get empty() {
        return this.from == this.to;
      }
      get assoc() {
        return this.flags & 4 ? -1 : this.flags & 8 ? 1 : 0;
      }
      get bidiLevel() {
        let level = this.flags & 3;
        return level == 3 ? null : level;
      }
      get goalColumn() {
        let value = this.flags >> 5;
        return value == 33554431 ? void 0 : value;
      }
      map(change, assoc = -1) {
        let from = change.mapPos(this.from, assoc), to = change.mapPos(this.to, assoc);
        return from == this.from && to == this.to ? this : new SelectionRange(from, to, this.flags);
      }
      extend(from, to = from) {
        if (from <= this.anchor && to >= this.anchor)
          return EditorSelection.range(from, to);
        let head = Math.abs(from - this.anchor) > Math.abs(to - this.anchor) ? from : to;
        return EditorSelection.range(this.anchor, head);
      }
      eq(other) {
        return this.anchor == other.anchor && this.head == other.head;
      }
      toJSON() {
        return { anchor: this.anchor, head: this.head };
      }
      static fromJSON(json) {
        if (!json || typeof json.anchor != "number" || typeof json.head != "number")
          throw new RangeError("Invalid JSON representation for SelectionRange");
        return EditorSelection.range(json.anchor, json.head);
      }
    };
    EditorSelection = class {
      constructor(ranges, mainIndex = 0) {
        this.ranges = ranges;
        this.mainIndex = mainIndex;
      }
      map(change, assoc = -1) {
        if (change.empty)
          return this;
        return EditorSelection.create(this.ranges.map((r2) => r2.map(change, assoc)), this.mainIndex);
      }
      eq(other) {
        if (this.ranges.length != other.ranges.length || this.mainIndex != other.mainIndex)
          return false;
        for (let i2 = 0; i2 < this.ranges.length; i2++)
          if (!this.ranges[i2].eq(other.ranges[i2]))
            return false;
        return true;
      }
      get main() {
        return this.ranges[this.mainIndex];
      }
      asSingle() {
        return this.ranges.length == 1 ? this : new EditorSelection([this.main]);
      }
      addRange(range2, main = true) {
        return EditorSelection.create([range2].concat(this.ranges), main ? 0 : this.mainIndex + 1);
      }
      replaceRange(range2, which = this.mainIndex) {
        let ranges = this.ranges.slice();
        ranges[which] = range2;
        return EditorSelection.create(ranges, this.mainIndex);
      }
      toJSON() {
        return { ranges: this.ranges.map((r2) => r2.toJSON()), main: this.mainIndex };
      }
      static fromJSON(json) {
        if (!json || !Array.isArray(json.ranges) || typeof json.main != "number" || json.main >= json.ranges.length)
          throw new RangeError("Invalid JSON representation for EditorSelection");
        return new EditorSelection(json.ranges.map((r2) => SelectionRange.fromJSON(r2)), json.main);
      }
      static single(anchor, head = anchor) {
        return new EditorSelection([EditorSelection.range(anchor, head)], 0);
      }
      static create(ranges, mainIndex = 0) {
        if (ranges.length == 0)
          throw new RangeError("A selection needs at least one range");
        for (let pos = 0, i2 = 0; i2 < ranges.length; i2++) {
          let range2 = ranges[i2];
          if (range2.empty ? range2.from <= pos : range2.from < pos)
            return normalized(ranges.slice(), mainIndex);
          pos = range2.to;
        }
        return new EditorSelection(ranges, mainIndex);
      }
      static cursor(pos, assoc = 0, bidiLevel, goalColumn) {
        return new SelectionRange(pos, pos, (assoc == 0 ? 0 : assoc < 0 ? 4 : 8) | (bidiLevel == null ? 3 : Math.min(2, bidiLevel)) | (goalColumn !== null && goalColumn !== void 0 ? goalColumn : 33554431) << 5);
      }
      static range(anchor, head, goalColumn) {
        let goal = (goalColumn !== null && goalColumn !== void 0 ? goalColumn : 33554431) << 5;
        return head < anchor ? new SelectionRange(head, anchor, 16 | goal) : new SelectionRange(anchor, head, goal);
      }
    };
    nextID = 0;
    Facet = class {
      constructor(combine, compareInput, compare2, isStatic, extensions) {
        this.combine = combine;
        this.compareInput = compareInput;
        this.compare = compare2;
        this.isStatic = isStatic;
        this.extensions = extensions;
        this.id = nextID++;
        this.default = combine([]);
      }
      static define(config = {}) {
        return new Facet(config.combine || ((a) => a), config.compareInput || ((a, b) => a === b), config.compare || (!config.combine ? sameArray : (a, b) => a === b), !!config.static, config.enables);
      }
      of(value) {
        return new FacetProvider([], this, 0, value);
      }
      compute(deps, get) {
        if (this.isStatic)
          throw new Error("Can't compute a static facet");
        return new FacetProvider(deps, this, 1, get);
      }
      computeN(deps, get) {
        if (this.isStatic)
          throw new Error("Can't compute a static facet");
        return new FacetProvider(deps, this, 2, get);
      }
      from(field, get) {
        if (!get)
          get = (x2) => x2;
        return this.compute([field], (state) => get(state.field(field)));
      }
    };
    FacetProvider = class {
      constructor(dependencies, facet, type, value) {
        this.dependencies = dependencies;
        this.facet = facet;
        this.type = type;
        this.value = value;
        this.id = nextID++;
      }
      dynamicSlot(addresses) {
        var _a;
        let getter = this.value;
        let compare2 = this.facet.compareInput;
        let idx = addresses[this.id] >> 1, multi = this.type == 2;
        let depDoc = false, depSel = false, depAddrs = [];
        for (let dep of this.dependencies) {
          if (dep == "doc")
            depDoc = true;
          else if (dep == "selection")
            depSel = true;
          else if ((((_a = addresses[dep.id]) !== null && _a !== void 0 ? _a : 1) & 1) == 0)
            depAddrs.push(addresses[dep.id]);
        }
        return (state, tr) => {
          let oldVal = state.values[idx];
          if (oldVal === Uninitialized) {
            state.values[idx] = getter(state);
            return 1;
          }
          if (tr) {
            let depChanged = depDoc && tr.docChanged || depSel && (tr.docChanged || tr.selection) || depAddrs.some((addr) => (ensureAddr(state, addr) & 1) > 0);
            if (depChanged) {
              let newVal = getter(state);
              if (multi ? !compareArray(newVal, oldVal, compare2) : !compare2(newVal, oldVal)) {
                state.values[idx] = newVal;
                return 1;
              }
            }
          }
          return 0;
        };
      }
    };
    initField = /* @__PURE__ */ Facet.define({ static: true });
    StateField = class {
      constructor(id2, createF, updateF, compareF, spec) {
        this.id = id2;
        this.createF = createF;
        this.updateF = updateF;
        this.compareF = compareF;
        this.spec = spec;
        this.provides = void 0;
      }
      static define(config) {
        let field = new StateField(nextID++, config.create, config.update, config.compare || ((a, b) => a === b), config);
        if (config.provide)
          field.provides = config.provide(field);
        return field;
      }
      create(state) {
        let init2 = state.facet(initField).find((i2) => i2.field == this);
        return ((init2 === null || init2 === void 0 ? void 0 : init2.create) || this.createF)(state);
      }
      slot(addresses) {
        let idx = addresses[this.id] >> 1;
        return (state, tr) => {
          let oldVal = state.values[idx];
          if (oldVal === Uninitialized) {
            state.values[idx] = this.create(state);
            return 1;
          }
          if (tr) {
            let value = this.updateF(oldVal, tr);
            if (!this.compareF(oldVal, value)) {
              state.values[idx] = value;
              return 1;
            }
          }
          return 0;
        };
      }
      init(create) {
        return [this, initField.of({ field: this, create })];
      }
      get extension() {
        return this;
      }
    };
    Prec_ = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
    Prec = {
      lowest: /* @__PURE__ */ prec(Prec_.lowest),
      low: /* @__PURE__ */ prec(Prec_.low),
      default: /* @__PURE__ */ prec(Prec_.default),
      high: /* @__PURE__ */ prec(Prec_.high),
      highest: /* @__PURE__ */ prec(Prec_.highest),
      fallback: /* @__PURE__ */ prec(Prec_.lowest),
      extend: /* @__PURE__ */ prec(Prec_.high),
      override: /* @__PURE__ */ prec(Prec_.highest)
    };
    PrecExtension = class {
      constructor(inner, prec2) {
        this.inner = inner;
        this.prec = prec2;
      }
    };
    Compartment = class {
      of(ext) {
        return new CompartmentInstance(this, ext);
      }
      reconfigure(content2) {
        return Compartment.reconfigure.of({ compartment: this, extension: content2 });
      }
      get(state) {
        return state.config.compartments.get(this);
      }
    };
    CompartmentInstance = class {
      constructor(compartment, inner) {
        this.compartment = compartment;
        this.inner = inner;
      }
    };
    Configuration = class {
      constructor(base3, compartments, dynamicSlots, address, staticValues) {
        this.base = base3;
        this.compartments = compartments;
        this.dynamicSlots = dynamicSlots;
        this.address = address;
        this.staticValues = staticValues;
        this.statusTemplate = [];
        while (this.statusTemplate.length < dynamicSlots.length)
          this.statusTemplate.push(0);
      }
      staticFacet(facet) {
        let addr = this.address[facet.id];
        return addr == null ? facet.default : this.staticValues[addr >> 1];
      }
      static resolve(base3, compartments, oldState) {
        let fields = [];
        let facets = Object.create(null);
        let newCompartments = new Map();
        for (let ext of flatten(base3, compartments, newCompartments)) {
          if (ext instanceof StateField)
            fields.push(ext);
          else
            (facets[ext.facet.id] || (facets[ext.facet.id] = [])).push(ext);
        }
        let address = Object.create(null);
        let staticValues = [];
        let dynamicSlots = [];
        let dynamicDeps = [];
        for (let field of fields) {
          address[field.id] = dynamicSlots.length << 1;
          dynamicSlots.push((a) => field.slot(a));
          dynamicDeps.push([]);
        }
        for (let id2 in facets) {
          let providers = facets[id2], facet = providers[0].facet;
          if (providers.every((p) => p.type == 0)) {
            address[facet.id] = staticValues.length << 1 | 1;
            let value = facet.combine(providers.map((p) => p.value));
            let oldAddr = oldState ? oldState.config.address[facet.id] : null;
            if (oldAddr != null) {
              let oldVal = getAddr(oldState, oldAddr);
              if (facet.compare(value, oldVal))
                value = oldVal;
            }
            staticValues.push(value);
          } else {
            for (let p of providers) {
              if (p.type == 0) {
                address[p.id] = staticValues.length << 1 | 1;
                staticValues.push(p.value);
              } else {
                address[p.id] = dynamicSlots.length << 1;
                dynamicSlots.push((a) => p.dynamicSlot(a));
                dynamicDeps.push(p.dependencies.filter((d) => typeof d != "string").map((d) => d.id));
              }
            }
            address[facet.id] = dynamicSlots.length << 1;
            dynamicSlots.push((a) => dynamicFacetSlot(a, facet, providers));
            dynamicDeps.push(providers.filter((p) => p.type != 0).map((d) => d.id));
          }
        }
        let dynamicValues = dynamicSlots.map((_) => Uninitialized);
        if (oldState) {
          let canReuse = (id2, depth) => {
            if (depth > 7)
              return false;
            let addr = address[id2];
            if (!(addr & 1))
              return dynamicDeps[addr >> 1].every((id3) => canReuse(id3, depth + 1));
            let oldAddr = oldState.config.address[id2];
            return oldAddr != null && getAddr(oldState, oldAddr) == staticValues[addr >> 1];
          };
          for (let id2 in address) {
            let cur = address[id2], prev = oldState.config.address[id2];
            if (prev != null && (cur & 1) == 0 && canReuse(+id2, 0))
              dynamicValues[cur >> 1] = getAddr(oldState, prev);
          }
        }
        return {
          configuration: new Configuration(base3, newCompartments, dynamicSlots.map((f3) => f3(address)), address, staticValues),
          values: dynamicValues
        };
      }
    };
    Uninitialized = {};
    languageData = /* @__PURE__ */ Facet.define();
    allowMultipleSelections = /* @__PURE__ */ Facet.define({
      combine: (values) => values.some((v) => v),
      static: true
    });
    lineSeparator = /* @__PURE__ */ Facet.define({
      combine: (values) => values.length ? values[0] : void 0,
      static: true
    });
    changeFilter = /* @__PURE__ */ Facet.define();
    transactionFilter = /* @__PURE__ */ Facet.define();
    transactionExtender = /* @__PURE__ */ Facet.define();
    readOnly = /* @__PURE__ */ Facet.define({
      combine: (values) => values.length ? values[0] : false
    });
    Annotation = class {
      constructor(type, value) {
        this.type = type;
        this.value = value;
      }
      static define() {
        return new AnnotationType();
      }
    };
    AnnotationType = class {
      of(value) {
        return new Annotation(this, value);
      }
    };
    StateEffectType = class {
      constructor(map) {
        this.map = map;
      }
      of(value) {
        return new StateEffect(this, value);
      }
    };
    StateEffect = class {
      constructor(type, value) {
        this.type = type;
        this.value = value;
      }
      map(mapping) {
        let mapped = this.type.map(this.value, mapping);
        return mapped === void 0 ? void 0 : mapped == this.value ? this : new StateEffect(this.type, mapped);
      }
      is(type) {
        return this.type == type;
      }
      static define(spec = {}) {
        return new StateEffectType(spec.map || ((v) => v));
      }
      static mapEffects(effects, mapping) {
        if (!effects.length)
          return effects;
        let result = [];
        for (let effect of effects) {
          let mapped = effect.map(mapping);
          if (mapped)
            result.push(mapped);
        }
        return result;
      }
    };
    StateEffect.reconfigure = /* @__PURE__ */ StateEffect.define();
    StateEffect.appendConfig = /* @__PURE__ */ StateEffect.define();
    Transaction = class {
      constructor(startState, changes, selection, effects, annotations, scrollIntoView2) {
        this.startState = startState;
        this.changes = changes;
        this.selection = selection;
        this.effects = effects;
        this.annotations = annotations;
        this.scrollIntoView = scrollIntoView2;
        this._doc = null;
        this._state = null;
        if (selection)
          checkSelection(selection, changes.newLength);
        if (!annotations.some((a) => a.type == Transaction.time))
          this.annotations = annotations.concat(Transaction.time.of(Date.now()));
      }
      get newDoc() {
        return this._doc || (this._doc = this.changes.apply(this.startState.doc));
      }
      get newSelection() {
        return this.selection || this.startState.selection.map(this.changes);
      }
      get state() {
        if (!this._state)
          this.startState.applyTransaction(this);
        return this._state;
      }
      annotation(type) {
        for (let ann of this.annotations)
          if (ann.type == type)
            return ann.value;
        return void 0;
      }
      get docChanged() {
        return !this.changes.empty;
      }
      get reconfigured() {
        return this.startState.config != this.state.config;
      }
      isUserEvent(event) {
        let e2 = this.annotation(Transaction.userEvent);
        return !!(e2 && (e2 == event || e2.length > event.length && e2.slice(0, event.length) == event && e2[event.length] == "."));
      }
    };
    Transaction.time = /* @__PURE__ */ Annotation.define();
    Transaction.userEvent = /* @__PURE__ */ Annotation.define();
    Transaction.addToHistory = /* @__PURE__ */ Annotation.define();
    Transaction.remote = /* @__PURE__ */ Annotation.define();
    none = [];
    CharCategory = /* @__PURE__ */ function(CharCategory2) {
      CharCategory2[CharCategory2["Word"] = 0] = "Word";
      CharCategory2[CharCategory2["Space"] = 1] = "Space";
      CharCategory2[CharCategory2["Other"] = 2] = "Other";
      return CharCategory2;
    }(CharCategory || (CharCategory = {}));
    nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    try {
      wordChar = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
    } catch (_) {
    }
    EditorState = class {
      constructor(config, doc2, selection, values, tr = null) {
        this.config = config;
        this.doc = doc2;
        this.selection = selection;
        this.values = values;
        this.applying = null;
        this.status = config.statusTemplate.slice();
        this.applying = tr;
        if (tr)
          tr._state = this;
        for (let i2 = 0; i2 < this.config.dynamicSlots.length; i2++)
          ensureAddr(this, i2 << 1);
        this.applying = null;
      }
      field(field, require2 = true) {
        let addr = this.config.address[field.id];
        if (addr == null) {
          if (require2)
            throw new RangeError("Field is not present in this state");
          return void 0;
        }
        ensureAddr(this, addr);
        return getAddr(this, addr);
      }
      update(...specs) {
        return resolveTransaction(this, specs, true);
      }
      applyTransaction(tr) {
        let conf = this.config, { base: base3, compartments } = conf;
        for (let effect of tr.effects) {
          if (effect.is(Compartment.reconfigure)) {
            if (conf) {
              compartments = new Map();
              conf.compartments.forEach((val, key) => compartments.set(key, val));
              conf = null;
            }
            compartments.set(effect.value.compartment, effect.value.extension);
          } else if (effect.is(StateEffect.reconfigure)) {
            conf = null;
            base3 = effect.value;
          } else if (effect.is(StateEffect.appendConfig)) {
            conf = null;
            base3 = asArray(base3).concat(effect.value);
          }
        }
        let startValues;
        if (!conf) {
          let resolved = Configuration.resolve(base3, compartments, this);
          conf = resolved.configuration;
          let intermediateState = new EditorState(conf, this.doc, this.selection, resolved.values, null);
          startValues = intermediateState.values;
        } else {
          startValues = tr.startState.values.slice();
        }
        new EditorState(conf, tr.newDoc, tr.newSelection, startValues, tr);
      }
      replaceSelection(text) {
        if (typeof text == "string")
          text = this.toText(text);
        return this.changeByRange((range2) => ({
          changes: { from: range2.from, to: range2.to, insert: text },
          range: EditorSelection.cursor(range2.from + text.length)
        }));
      }
      changeByRange(f3) {
        let sel = this.selection;
        let result1 = f3(sel.ranges[0]);
        let changes = this.changes(result1.changes), ranges = [result1.range];
        let effects = asArray(result1.effects);
        for (let i2 = 1; i2 < sel.ranges.length; i2++) {
          let result = f3(sel.ranges[i2]);
          let newChanges = this.changes(result.changes), newMapped = newChanges.map(changes);
          for (let j = 0; j < i2; j++)
            ranges[j] = ranges[j].map(newMapped);
          let mapBy = changes.mapDesc(newChanges, true);
          ranges.push(result.range.map(mapBy));
          changes = changes.compose(newMapped);
          effects = StateEffect.mapEffects(effects, newMapped).concat(StateEffect.mapEffects(asArray(result.effects), mapBy));
        }
        return {
          changes,
          selection: EditorSelection.create(ranges, sel.mainIndex),
          effects
        };
      }
      changes(spec = []) {
        if (spec instanceof ChangeSet)
          return spec;
        return ChangeSet.of(spec, this.doc.length, this.facet(EditorState.lineSeparator));
      }
      toText(string2) {
        return Text.of(string2.split(this.facet(EditorState.lineSeparator) || DefaultSplit));
      }
      sliceDoc(from = 0, to = this.doc.length) {
        return this.doc.sliceString(from, to, this.lineBreak);
      }
      facet(facet) {
        let addr = this.config.address[facet.id];
        if (addr == null)
          return facet.default;
        ensureAddr(this, addr);
        return getAddr(this, addr);
      }
      toJSON(fields) {
        let result = {
          doc: this.sliceDoc(),
          selection: this.selection.toJSON()
        };
        if (fields)
          for (let prop in fields) {
            let value = fields[prop];
            if (value instanceof StateField)
              result[prop] = value.spec.toJSON(this.field(fields[prop]), this);
          }
        return result;
      }
      static fromJSON(json, config = {}, fields) {
        if (!json || typeof json.doc != "string")
          throw new RangeError("Invalid JSON representation for EditorState");
        let fieldInit = [];
        if (fields)
          for (let prop in fields) {
            let field = fields[prop], value = json[prop];
            fieldInit.push(field.init((state) => field.spec.fromJSON(value, state)));
          }
        return EditorState.create({
          doc: json.doc,
          selection: EditorSelection.fromJSON(json.selection),
          extensions: config.extensions ? fieldInit.concat([config.extensions]) : fieldInit
        });
      }
      static create(config = {}) {
        let { configuration, values } = Configuration.resolve(config.extensions || [], new Map());
        let doc2 = config.doc instanceof Text ? config.doc : Text.of((config.doc || "").split(configuration.staticFacet(EditorState.lineSeparator) || DefaultSplit));
        let selection = !config.selection ? EditorSelection.single(0) : config.selection instanceof EditorSelection ? config.selection : EditorSelection.single(config.selection.anchor, config.selection.head);
        checkSelection(selection, doc2.length);
        if (!configuration.staticFacet(allowMultipleSelections))
          selection = selection.asSingle();
        return new EditorState(configuration, doc2, selection, values);
      }
      get tabSize() {
        return this.facet(EditorState.tabSize);
      }
      get lineBreak() {
        return this.facet(EditorState.lineSeparator) || "\n";
      }
      get readOnly() {
        return this.facet(readOnly);
      }
      phrase(phrase) {
        for (let map of this.facet(EditorState.phrases))
          if (Object.prototype.hasOwnProperty.call(map, phrase))
            return map[phrase];
        return phrase;
      }
      languageDataAt(name2, pos, side = -1) {
        let values = [];
        for (let provider of this.facet(languageData)) {
          for (let result of provider(this, pos, side)) {
            if (Object.prototype.hasOwnProperty.call(result, name2))
              values.push(result[name2]);
          }
        }
        return values;
      }
      charCategorizer(at) {
        return makeCategorizer(this.languageDataAt("wordChars", at).join(""));
      }
      wordAt(pos) {
        let { text, from, length } = this.doc.lineAt(pos);
        let cat = this.charCategorizer(pos);
        let start = pos - from, end = pos - from;
        while (start > 0) {
          let prev = findClusterBreak(text, start, false);
          if (cat(text.slice(prev, start)) != CharCategory.Word)
            break;
          start = prev;
        }
        while (end < length) {
          let next = findClusterBreak(text, end);
          if (cat(text.slice(end, next)) != CharCategory.Word)
            break;
          end = next;
        }
        return start == end ? null : EditorSelection.range(start + from, end + from);
      }
    };
    EditorState.allowMultipleSelections = allowMultipleSelections;
    EditorState.tabSize = /* @__PURE__ */ Facet.define({
      combine: (values) => values.length ? values[0] : 4
    });
    EditorState.lineSeparator = lineSeparator;
    EditorState.readOnly = readOnly;
    EditorState.phrases = /* @__PURE__ */ Facet.define();
    EditorState.languageData = languageData;
    EditorState.changeFilter = changeFilter;
    EditorState.transactionFilter = transactionFilter;
    EditorState.transactionExtender = transactionExtender;
    Compartment.reconfigure = /* @__PURE__ */ StateEffect.define();
  }
});

// node_modules/style-mod/src/style-mod.js
var C, COUNT, SET, top, StyleModule, adoptedSet, StyleSet;
var init_style_mod = __esm({
  "node_modules/style-mod/src/style-mod.js"() {
    init_shims();
    C = "\u037C";
    COUNT = typeof Symbol == "undefined" ? "__" + C : Symbol.for(C);
    SET = typeof Symbol == "undefined" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet");
    top = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : {};
    StyleModule = class {
      constructor(spec, options2) {
        this.rules = [];
        let { finish } = options2 || {};
        function splitSelector(selector) {
          return /^@/.test(selector) ? [selector] : selector.split(/,\s*/);
        }
        function render2(selectors, spec2, target, isKeyframes) {
          let local = [], isAt = /^@(\w+)\b/.exec(selectors[0]), keyframes = isAt && isAt[1] == "keyframes";
          if (isAt && spec2 == null)
            return target.push(selectors[0] + ";");
          for (let prop in spec2) {
            let value = spec2[prop];
            if (/&/.test(prop)) {
              render2(prop.split(/,\s*/).map((part) => selectors.map((sel) => part.replace(/&/, sel))).reduce((a, b) => a.concat(b)), value, target);
            } else if (value && typeof value == "object") {
              if (!isAt)
                throw new RangeError("The value of a property (" + prop + ") should be a primitive value.");
              render2(splitSelector(prop), value, local, keyframes);
            } else if (value != null) {
              local.push(prop.replace(/_.*/, "").replace(/[A-Z]/g, (l) => "-" + l.toLowerCase()) + ": " + value + ";");
            }
          }
          if (local.length || keyframes) {
            target.push((finish && !isAt && !isKeyframes ? selectors.map(finish) : selectors).join(", ") + " {" + local.join(" ") + "}");
          }
        }
        for (let prop in spec)
          render2(splitSelector(prop), spec[prop], this.rules);
      }
      getRules() {
        return this.rules.join("\n");
      }
      static newName() {
        let id2 = top[COUNT] || 1;
        top[COUNT] = id2 + 1;
        return C + id2.toString(36);
      }
      static mount(root, modules) {
        (root[SET] || new StyleSet(root)).mount(Array.isArray(modules) ? modules : [modules]);
      }
    };
    adoptedSet = null;
    StyleSet = class {
      constructor(root) {
        if (!root.head && root.adoptedStyleSheets && typeof CSSStyleSheet != "undefined") {
          if (adoptedSet) {
            root.adoptedStyleSheets = [adoptedSet.sheet].concat(root.adoptedStyleSheets);
            return root[SET] = adoptedSet;
          }
          this.sheet = new CSSStyleSheet();
          root.adoptedStyleSheets = [this.sheet].concat(root.adoptedStyleSheets);
          adoptedSet = this;
        } else {
          this.styleTag = (root.ownerDocument || root).createElement("style");
          let target = root.head || root;
          target.insertBefore(this.styleTag, target.firstChild);
        }
        this.modules = [];
        root[SET] = this;
      }
      mount(modules) {
        let sheet = this.sheet;
        let pos = 0, j = 0;
        for (let i2 = 0; i2 < modules.length; i2++) {
          let mod = modules[i2], index2 = this.modules.indexOf(mod);
          if (index2 < j && index2 > -1) {
            this.modules.splice(index2, 1);
            j--;
            index2 = -1;
          }
          if (index2 == -1) {
            this.modules.splice(j++, 0, mod);
            if (sheet)
              for (let k = 0; k < mod.rules.length; k++)
                sheet.insertRule(mod.rules[k], pos++);
          } else {
            while (j < index2)
              pos += this.modules[j++].rules.length;
            pos += mod.rules.length;
            j++;
          }
        }
        if (!sheet) {
          let text = "";
          for (let i2 = 0; i2 < this.modules.length; i2++)
            text += this.modules[i2].getRules() + "\n";
          this.styleTag.textContent = text;
        }
      }
    };
  }
});

// node_modules/@codemirror/rangeset/dist/index.js
function cmpRange(a, b) {
  return a.from - b.from || a.value.startSide - b.value.startSide;
}
function lazySort(ranges) {
  if (ranges.length > 1)
    for (let prev = ranges[0], i2 = 1; i2 < ranges.length; i2++) {
      let cur = ranges[i2];
      if (cmpRange(prev, cur) > 0)
        return ranges.slice().sort(cmpRange);
      prev = cur;
    }
  return ranges;
}
function findSharedChunks(a, b, textDiff) {
  let inA = new Map();
  for (let set of a)
    for (let i2 = 0; i2 < set.chunk.length; i2++)
      if (set.chunk[i2].maxPoint <= 0)
        inA.set(set.chunk[i2], set.chunkPos[i2]);
  let shared = new Set();
  for (let set of b)
    for (let i2 = 0; i2 < set.chunk.length; i2++) {
      let known = inA.get(set.chunk[i2]);
      if (known != null && (textDiff ? textDiff.mapPos(known) : known) == set.chunkPos[i2])
        shared.add(set.chunk[i2]);
    }
  return shared;
}
function heapBubble(heap, index2) {
  for (let cur = heap[index2]; ; ) {
    let childIndex = (index2 << 1) + 1;
    if (childIndex >= heap.length)
      break;
    let child = heap[childIndex];
    if (childIndex + 1 < heap.length && child.compare(heap[childIndex + 1]) >= 0) {
      child = heap[childIndex + 1];
      childIndex++;
    }
    if (cur.compare(child) < 0)
      break;
    heap[childIndex] = cur;
    heap[index2] = child;
    index2 = childIndex;
  }
}
function compare(a, startA, b, startB, length, comparator) {
  a.goto(startA);
  b.goto(startB);
  let endB = startB + length;
  let pos = startB, dPos = startB - startA;
  for (; ; ) {
    let diff = a.to + dPos - b.to || a.endSide - b.endSide;
    let end = diff < 0 ? a.to + dPos : b.to, clipEnd = Math.min(end, endB);
    if (a.point || b.point) {
      if (!(a.point && b.point && (a.point == b.point || a.point.eq(b.point)) && sameValues(a.activeForPoint(a.to + dPos), b.activeForPoint(b.to))))
        comparator.comparePoint(pos, clipEnd, a.point, b.point);
    } else {
      if (clipEnd > pos && !sameValues(a.active, b.active))
        comparator.compareRange(pos, clipEnd, a.active, b.active);
    }
    if (end > endB)
      break;
    pos = end;
    if (diff <= 0)
      a.next();
    if (diff >= 0)
      b.next();
  }
}
function sameValues(a, b) {
  if (a.length != b.length)
    return false;
  for (let i2 = 0; i2 < a.length; i2++)
    if (a[i2] != b[i2] && !a[i2].eq(b[i2]))
      return false;
  return true;
}
function remove(array, index2) {
  for (let i2 = index2, e2 = array.length - 1; i2 < e2; i2++)
    array[i2] = array[i2 + 1];
  array.pop();
}
function insert(array, index2, value) {
  for (let i2 = array.length - 1; i2 >= index2; i2--)
    array[i2 + 1] = array[i2];
  array[index2] = value;
}
function findMinIndex(value, array) {
  let found = -1, foundPos = 1e9;
  for (let i2 = 0; i2 < array.length; i2++)
    if ((array[i2] - foundPos || value[i2].endSide - value[found].endSide) < 0) {
      found = i2;
      foundPos = array[i2];
    }
  return found;
}
var RangeValue, Range, Chunk, RangeSet, RangeSetBuilder, LayerCursor, HeapCursor, SpanCursor;
var init_dist3 = __esm({
  "node_modules/@codemirror/rangeset/dist/index.js"() {
    init_shims();
    init_dist2();
    RangeValue = class {
      eq(other) {
        return this == other;
      }
      range(from, to = from) {
        return new Range(from, to, this);
      }
    };
    RangeValue.prototype.startSide = RangeValue.prototype.endSide = 0;
    RangeValue.prototype.point = false;
    RangeValue.prototype.mapMode = MapMode.TrackDel;
    Range = class {
      constructor(from, to, value) {
        this.from = from;
        this.to = to;
        this.value = value;
      }
    };
    Chunk = class {
      constructor(from, to, value, maxPoint) {
        this.from = from;
        this.to = to;
        this.value = value;
        this.maxPoint = maxPoint;
      }
      get length() {
        return this.to[this.to.length - 1];
      }
      findIndex(pos, side, end, startAt = 0) {
        let arr = end ? this.to : this.from;
        for (let lo = startAt, hi = arr.length; ; ) {
          if (lo == hi)
            return lo;
          let mid = lo + hi >> 1;
          let diff = arr[mid] - pos || (end ? this.value[mid].endSide : this.value[mid].startSide) - side;
          if (mid == lo)
            return diff >= 0 ? lo : hi;
          if (diff >= 0)
            hi = mid;
          else
            lo = mid + 1;
        }
      }
      between(offset, from, to, f3) {
        for (let i2 = this.findIndex(from, -1e9, true), e2 = this.findIndex(to, 1e9, false, i2); i2 < e2; i2++)
          if (f3(this.from[i2] + offset, this.to[i2] + offset, this.value[i2]) === false)
            return false;
      }
      map(offset, changes) {
        let value = [], from = [], to = [], newPos = -1, maxPoint = -1;
        for (let i2 = 0; i2 < this.value.length; i2++) {
          let val = this.value[i2], curFrom = this.from[i2] + offset, curTo = this.to[i2] + offset, newFrom, newTo;
          if (curFrom == curTo) {
            let mapped = changes.mapPos(curFrom, val.startSide, val.mapMode);
            if (mapped == null)
              continue;
            newFrom = newTo = mapped;
          } else {
            newFrom = changes.mapPos(curFrom, val.startSide);
            newTo = changes.mapPos(curTo, val.endSide);
            if (newFrom > newTo || newFrom == newTo && val.startSide > 0 && val.endSide <= 0)
              continue;
          }
          if ((newTo - newFrom || val.endSide - val.startSide) < 0)
            continue;
          if (newPos < 0)
            newPos = newFrom;
          if (val.point)
            maxPoint = Math.max(maxPoint, newTo - newFrom);
          value.push(val);
          from.push(newFrom - newPos);
          to.push(newTo - newPos);
        }
        return { mapped: value.length ? new Chunk(from, to, value, maxPoint) : null, pos: newPos };
      }
    };
    RangeSet = class {
      constructor(chunkPos, chunk, nextLayer = RangeSet.empty, maxPoint) {
        this.chunkPos = chunkPos;
        this.chunk = chunk;
        this.nextLayer = nextLayer;
        this.maxPoint = maxPoint;
      }
      get length() {
        let last = this.chunk.length - 1;
        return last < 0 ? 0 : Math.max(this.chunkEnd(last), this.nextLayer.length);
      }
      get size() {
        if (this.isEmpty)
          return 0;
        let size = this.nextLayer.size;
        for (let chunk of this.chunk)
          size += chunk.value.length;
        return size;
      }
      chunkEnd(index2) {
        return this.chunkPos[index2] + this.chunk[index2].length;
      }
      update(updateSpec) {
        let { add = [], sort = false, filterFrom = 0, filterTo = this.length } = updateSpec;
        let filter = updateSpec.filter;
        if (add.length == 0 && !filter)
          return this;
        if (sort)
          add.slice().sort(cmpRange);
        if (this.isEmpty)
          return add.length ? RangeSet.of(add) : this;
        let cur = new LayerCursor(this, null, -1).goto(0), i2 = 0, spill = [];
        let builder = new RangeSetBuilder();
        while (cur.value || i2 < add.length) {
          if (i2 < add.length && (cur.from - add[i2].from || cur.startSide - add[i2].value.startSide) >= 0) {
            let range2 = add[i2++];
            if (!builder.addInner(range2.from, range2.to, range2.value))
              spill.push(range2);
          } else if (cur.rangeIndex == 1 && cur.chunkIndex < this.chunk.length && (i2 == add.length || this.chunkEnd(cur.chunkIndex) < add[i2].from) && (!filter || filterFrom > this.chunkEnd(cur.chunkIndex) || filterTo < this.chunkPos[cur.chunkIndex]) && builder.addChunk(this.chunkPos[cur.chunkIndex], this.chunk[cur.chunkIndex])) {
            cur.nextChunk();
          } else {
            if (!filter || filterFrom > cur.to || filterTo < cur.from || filter(cur.from, cur.to, cur.value)) {
              if (!builder.addInner(cur.from, cur.to, cur.value))
                spill.push(new Range(cur.from, cur.to, cur.value));
            }
            cur.next();
          }
        }
        return builder.finishInner(this.nextLayer.isEmpty && !spill.length ? RangeSet.empty : this.nextLayer.update({ add: spill, filter, filterFrom, filterTo }));
      }
      map(changes) {
        if (changes.length == 0 || this.isEmpty)
          return this;
        let chunks = [], chunkPos = [], maxPoint = -1;
        for (let i2 = 0; i2 < this.chunk.length; i2++) {
          let start = this.chunkPos[i2], chunk = this.chunk[i2];
          let touch = changes.touchesRange(start, start + chunk.length);
          if (touch === false) {
            maxPoint = Math.max(maxPoint, chunk.maxPoint);
            chunks.push(chunk);
            chunkPos.push(changes.mapPos(start));
          } else if (touch === true) {
            let { mapped, pos } = chunk.map(start, changes);
            if (mapped) {
              maxPoint = Math.max(maxPoint, mapped.maxPoint);
              chunks.push(mapped);
              chunkPos.push(pos);
            }
          }
        }
        let next = this.nextLayer.map(changes);
        return chunks.length == 0 ? next : new RangeSet(chunkPos, chunks, next, maxPoint);
      }
      between(from, to, f3) {
        if (this.isEmpty)
          return;
        for (let i2 = 0; i2 < this.chunk.length; i2++) {
          let start = this.chunkPos[i2], chunk = this.chunk[i2];
          if (to >= start && from <= start + chunk.length && chunk.between(start, from - start, to - start, f3) === false)
            return;
        }
        this.nextLayer.between(from, to, f3);
      }
      iter(from = 0) {
        return HeapCursor.from([this]).goto(from);
      }
      get isEmpty() {
        return this.nextLayer == this;
      }
      static iter(sets, from = 0) {
        return HeapCursor.from(sets).goto(from);
      }
      static compare(oldSets, newSets, textDiff, comparator, minPointSize = -1) {
        let a = oldSets.filter((set) => set.maxPoint > 0 || !set.isEmpty && set.maxPoint >= minPointSize);
        let b = newSets.filter((set) => set.maxPoint > 0 || !set.isEmpty && set.maxPoint >= minPointSize);
        let sharedChunks = findSharedChunks(a, b, textDiff);
        let sideA = new SpanCursor(a, sharedChunks, minPointSize);
        let sideB = new SpanCursor(b, sharedChunks, minPointSize);
        textDiff.iterGaps((fromA, fromB, length) => compare(sideA, fromA, sideB, fromB, length, comparator));
        if (textDiff.empty && textDiff.length == 0)
          compare(sideA, 0, sideB, 0, 0, comparator);
      }
      static eq(oldSets, newSets, from = 0, to) {
        if (to == null)
          to = 1e9;
        let a = oldSets.filter((set) => !set.isEmpty && newSets.indexOf(set) < 0);
        let b = newSets.filter((set) => !set.isEmpty && oldSets.indexOf(set) < 0);
        if (a.length != b.length)
          return false;
        if (!a.length)
          return true;
        let sharedChunks = findSharedChunks(a, b);
        let sideA = new SpanCursor(a, sharedChunks, 0).goto(from), sideB = new SpanCursor(b, sharedChunks, 0).goto(from);
        for (; ; ) {
          if (sideA.to != sideB.to || !sameValues(sideA.active, sideB.active) || sideA.point && (!sideB.point || !sideA.point.eq(sideB.point)))
            return false;
          if (sideA.to > to)
            return true;
          sideA.next();
          sideB.next();
        }
      }
      static spans(sets, from, to, iterator, minPointSize = -1) {
        var _a;
        let cursor = new SpanCursor(sets, null, minPointSize, (_a = iterator.filterPoint) === null || _a === void 0 ? void 0 : _a.bind(iterator)).goto(from), pos = from;
        let open = cursor.openStart;
        for (; ; ) {
          let curTo = Math.min(cursor.to, to);
          if (cursor.point) {
            iterator.point(pos, curTo, cursor.point, cursor.activeForPoint(cursor.to), open);
            open = cursor.openEnd(curTo) + (cursor.to > curTo ? 1 : 0);
          } else if (curTo > pos) {
            iterator.span(pos, curTo, cursor.active, open);
            open = cursor.openEnd(curTo);
          }
          if (cursor.to > to)
            break;
          pos = cursor.to;
          cursor.next();
        }
        return open;
      }
      static of(ranges, sort = false) {
        let build = new RangeSetBuilder();
        for (let range2 of ranges instanceof Range ? [ranges] : sort ? lazySort(ranges) : ranges)
          build.add(range2.from, range2.to, range2.value);
        return build.finish();
      }
    };
    RangeSet.empty = /* @__PURE__ */ new RangeSet([], [], null, -1);
    RangeSet.empty.nextLayer = RangeSet.empty;
    RangeSetBuilder = class {
      constructor() {
        this.chunks = [];
        this.chunkPos = [];
        this.chunkStart = -1;
        this.last = null;
        this.lastFrom = -1e9;
        this.lastTo = -1e9;
        this.from = [];
        this.to = [];
        this.value = [];
        this.maxPoint = -1;
        this.setMaxPoint = -1;
        this.nextLayer = null;
      }
      finishChunk(newArrays) {
        this.chunks.push(new Chunk(this.from, this.to, this.value, this.maxPoint));
        this.chunkPos.push(this.chunkStart);
        this.chunkStart = -1;
        this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint);
        this.maxPoint = -1;
        if (newArrays) {
          this.from = [];
          this.to = [];
          this.value = [];
        }
      }
      add(from, to, value) {
        if (!this.addInner(from, to, value))
          (this.nextLayer || (this.nextLayer = new RangeSetBuilder())).add(from, to, value);
      }
      addInner(from, to, value) {
        let diff = from - this.lastTo || value.startSide - this.last.endSide;
        if (diff <= 0 && (from - this.lastFrom || value.startSide - this.last.startSide) < 0)
          throw new Error("Ranges must be added sorted by `from` position and `startSide`");
        if (diff < 0)
          return false;
        if (this.from.length == 250)
          this.finishChunk(true);
        if (this.chunkStart < 0)
          this.chunkStart = from;
        this.from.push(from - this.chunkStart);
        this.to.push(to - this.chunkStart);
        this.last = value;
        this.lastFrom = from;
        this.lastTo = to;
        this.value.push(value);
        if (value.point)
          this.maxPoint = Math.max(this.maxPoint, to - from);
        return true;
      }
      addChunk(from, chunk) {
        if ((from - this.lastTo || chunk.value[0].startSide - this.last.endSide) < 0)
          return false;
        if (this.from.length)
          this.finishChunk(true);
        this.setMaxPoint = Math.max(this.setMaxPoint, chunk.maxPoint);
        this.chunks.push(chunk);
        this.chunkPos.push(from);
        let last = chunk.value.length - 1;
        this.last = chunk.value[last];
        this.lastFrom = chunk.from[last] + from;
        this.lastTo = chunk.to[last] + from;
        return true;
      }
      finish() {
        return this.finishInner(RangeSet.empty);
      }
      finishInner(next) {
        if (this.from.length)
          this.finishChunk(false);
        if (this.chunks.length == 0)
          return next;
        let result = new RangeSet(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(next) : next, this.setMaxPoint);
        this.from = null;
        return result;
      }
    };
    LayerCursor = class {
      constructor(layer, skip, minPoint, rank = 0) {
        this.layer = layer;
        this.skip = skip;
        this.minPoint = minPoint;
        this.rank = rank;
      }
      get startSide() {
        return this.value ? this.value.startSide : 0;
      }
      get endSide() {
        return this.value ? this.value.endSide : 0;
      }
      goto(pos, side = -1e9) {
        this.chunkIndex = this.rangeIndex = 0;
        this.gotoInner(pos, side, false);
        return this;
      }
      gotoInner(pos, side, forward) {
        while (this.chunkIndex < this.layer.chunk.length) {
          let next = this.layer.chunk[this.chunkIndex];
          if (!(this.skip && this.skip.has(next) || this.layer.chunkEnd(this.chunkIndex) < pos || next.maxPoint < this.minPoint))
            break;
          this.chunkIndex++;
          forward = false;
        }
        if (this.chunkIndex < this.layer.chunk.length) {
          let rangeIndex = this.layer.chunk[this.chunkIndex].findIndex(pos - this.layer.chunkPos[this.chunkIndex], side, true);
          if (!forward || this.rangeIndex < rangeIndex)
            this.setRangeIndex(rangeIndex);
        }
        this.next();
      }
      forward(pos, side) {
        if ((this.to - pos || this.endSide - side) < 0)
          this.gotoInner(pos, side, true);
      }
      next() {
        for (; ; ) {
          if (this.chunkIndex == this.layer.chunk.length) {
            this.from = this.to = 1e9;
            this.value = null;
            break;
          } else {
            let chunkPos = this.layer.chunkPos[this.chunkIndex], chunk = this.layer.chunk[this.chunkIndex];
            let from = chunkPos + chunk.from[this.rangeIndex];
            this.from = from;
            this.to = chunkPos + chunk.to[this.rangeIndex];
            this.value = chunk.value[this.rangeIndex];
            this.setRangeIndex(this.rangeIndex + 1);
            if (this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
              break;
          }
        }
      }
      setRangeIndex(index2) {
        if (index2 == this.layer.chunk[this.chunkIndex].value.length) {
          this.chunkIndex++;
          if (this.skip) {
            while (this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]))
              this.chunkIndex++;
          }
          this.rangeIndex = 0;
        } else {
          this.rangeIndex = index2;
        }
      }
      nextChunk() {
        this.chunkIndex++;
        this.rangeIndex = 0;
        this.next();
      }
      compare(other) {
        return this.from - other.from || this.startSide - other.startSide || this.to - other.to || this.endSide - other.endSide;
      }
    };
    HeapCursor = class {
      constructor(heap) {
        this.heap = heap;
      }
      static from(sets, skip = null, minPoint = -1) {
        let heap = [];
        for (let i2 = 0; i2 < sets.length; i2++) {
          for (let cur = sets[i2]; !cur.isEmpty; cur = cur.nextLayer) {
            if (cur.maxPoint >= minPoint)
              heap.push(new LayerCursor(cur, skip, minPoint, i2));
          }
        }
        return heap.length == 1 ? heap[0] : new HeapCursor(heap);
      }
      get startSide() {
        return this.value ? this.value.startSide : 0;
      }
      goto(pos, side = -1e9) {
        for (let cur of this.heap)
          cur.goto(pos, side);
        for (let i2 = this.heap.length >> 1; i2 >= 0; i2--)
          heapBubble(this.heap, i2);
        this.next();
        return this;
      }
      forward(pos, side) {
        for (let cur of this.heap)
          cur.forward(pos, side);
        for (let i2 = this.heap.length >> 1; i2 >= 0; i2--)
          heapBubble(this.heap, i2);
        if ((this.to - pos || this.value.endSide - side) < 0)
          this.next();
      }
      next() {
        if (this.heap.length == 0) {
          this.from = this.to = 1e9;
          this.value = null;
          this.rank = -1;
        } else {
          let top2 = this.heap[0];
          this.from = top2.from;
          this.to = top2.to;
          this.value = top2.value;
          this.rank = top2.rank;
          if (top2.value)
            top2.next();
          heapBubble(this.heap, 0);
        }
      }
    };
    SpanCursor = class {
      constructor(sets, skip, minPoint, filterPoint = () => true) {
        this.minPoint = minPoint;
        this.filterPoint = filterPoint;
        this.active = [];
        this.activeTo = [];
        this.activeRank = [];
        this.minActive = -1;
        this.point = null;
        this.pointFrom = 0;
        this.pointRank = 0;
        this.to = -1e9;
        this.endSide = 0;
        this.openStart = -1;
        this.cursor = HeapCursor.from(sets, skip, minPoint);
      }
      goto(pos, side = -1e9) {
        this.cursor.goto(pos, side);
        this.active.length = this.activeTo.length = this.activeRank.length = 0;
        this.minActive = -1;
        this.to = pos;
        this.endSide = side;
        this.openStart = -1;
        this.next();
        return this;
      }
      forward(pos, side) {
        while (this.minActive > -1 && (this.activeTo[this.minActive] - pos || this.active[this.minActive].endSide - side) < 0)
          this.removeActive(this.minActive);
        this.cursor.forward(pos, side);
      }
      removeActive(index2) {
        remove(this.active, index2);
        remove(this.activeTo, index2);
        remove(this.activeRank, index2);
        this.minActive = findMinIndex(this.active, this.activeTo);
      }
      addActive(trackOpen) {
        let i2 = 0, { value, to, rank } = this.cursor;
        while (i2 < this.activeRank.length && this.activeRank[i2] <= rank)
          i2++;
        insert(this.active, i2, value);
        insert(this.activeTo, i2, to);
        insert(this.activeRank, i2, rank);
        if (trackOpen)
          insert(trackOpen, i2, this.cursor.from);
        this.minActive = findMinIndex(this.active, this.activeTo);
      }
      next() {
        let from = this.to, wasPoint = this.point;
        this.point = null;
        let trackOpen = this.openStart < 0 ? [] : null, trackExtra = 0;
        for (; ; ) {
          let a = this.minActive;
          if (a > -1 && (this.activeTo[a] - this.cursor.from || this.active[a].endSide - this.cursor.startSide) < 0) {
            if (this.activeTo[a] > from) {
              this.to = this.activeTo[a];
              this.endSide = this.active[a].endSide;
              break;
            }
            this.removeActive(a);
            if (trackOpen)
              remove(trackOpen, a);
          } else if (!this.cursor.value) {
            this.to = this.endSide = 1e9;
            break;
          } else if (this.cursor.from > from) {
            this.to = this.cursor.from;
            this.endSide = this.cursor.startSide;
            break;
          } else {
            let nextVal = this.cursor.value;
            if (!nextVal.point) {
              this.addActive(trackOpen);
              this.cursor.next();
            } else if (wasPoint && this.cursor.to == this.to && this.cursor.from < this.cursor.to) {
              this.cursor.next();
            } else if (!this.filterPoint(this.cursor.from, this.cursor.to, this.cursor.value, this.cursor.rank)) {
              this.cursor.next();
            } else {
              this.point = nextVal;
              this.pointFrom = this.cursor.from;
              this.pointRank = this.cursor.rank;
              this.to = this.cursor.to;
              this.endSide = nextVal.endSide;
              if (this.cursor.from < from)
                trackExtra = 1;
              this.cursor.next();
              if (this.to > from)
                this.forward(this.to, this.endSide);
              break;
            }
          }
        }
        if (trackOpen) {
          let openStart = 0;
          while (openStart < trackOpen.length && trackOpen[openStart] < from)
            openStart++;
          this.openStart = openStart + trackExtra;
        }
      }
      activeForPoint(to) {
        if (!this.active.length)
          return this.active;
        let active = [];
        for (let i2 = this.active.length - 1; i2 >= 0; i2--) {
          if (this.activeRank[i2] < this.pointRank)
            break;
          if (this.activeTo[i2] > to || this.activeTo[i2] == to && this.active[i2].endSide >= this.point.endSide)
            active.push(this.active[i2]);
        }
        return active.reverse();
      }
      openEnd(to) {
        let open = 0;
        for (let i2 = this.activeTo.length - 1; i2 >= 0 && this.activeTo[i2] > to; i2--)
          open++;
        return open;
      }
    };
  }
});

// node_modules/w3c-keyname/index.es.js
function keyName(event) {
  var ignoreKey = brokenModifierNames && (event.ctrlKey || event.altKey || event.metaKey) || (safari || ie) && event.shiftKey && event.key && event.key.length == 1;
  var name2 = !ignoreKey && event.key || (event.shiftKey ? shift : base)[event.keyCode] || event.key || "Unidentified";
  if (name2 == "Esc")
    name2 = "Escape";
  if (name2 == "Del")
    name2 = "Delete";
  if (name2 == "Left")
    name2 = "ArrowLeft";
  if (name2 == "Up")
    name2 = "ArrowUp";
  if (name2 == "Right")
    name2 = "ArrowRight";
  if (name2 == "Down")
    name2 = "ArrowDown";
  return name2;
}
var base, shift, chrome, safari, gecko, mac, ie, brokenModifierNames, i2, i2, i2, code;
var init_index_es = __esm({
  "node_modules/w3c-keyname/index.es.js"() {
    init_shims();
    base = {
      8: "Backspace",
      9: "Tab",
      10: "Enter",
      12: "NumLock",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      44: "PrintScreen",
      45: "Insert",
      46: "Delete",
      59: ";",
      61: "=",
      91: "Meta",
      92: "Meta",
      106: "*",
      107: "+",
      108: ",",
      109: "-",
      110: ".",
      111: "/",
      144: "NumLock",
      145: "ScrollLock",
      160: "Shift",
      161: "Shift",
      162: "Control",
      163: "Control",
      164: "Alt",
      165: "Alt",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'",
      229: "q"
    };
    shift = {
      48: ")",
      49: "!",
      50: "@",
      51: "#",
      52: "$",
      53: "%",
      54: "^",
      55: "&",
      56: "*",
      57: "(",
      59: ":",
      61: "+",
      173: "_",
      186: ":",
      187: "+",
      188: "<",
      189: "_",
      190: ">",
      191: "?",
      192: "~",
      219: "{",
      220: "|",
      221: "}",
      222: '"',
      229: "Q"
    };
    chrome = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent);
    safari = typeof navigator != "undefined" && /Apple Computer/.test(navigator.vendor);
    gecko = typeof navigator != "undefined" && /Gecko\/\d+/.test(navigator.userAgent);
    mac = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
    ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
    brokenModifierNames = chrome && (mac || +chrome[1] < 57) || gecko && mac;
    for (i2 = 0; i2 < 10; i2++)
      base[48 + i2] = base[96 + i2] = String(i2);
    for (i2 = 1; i2 <= 24; i2++)
      base[i2 + 111] = "F" + i2;
    for (i2 = 65; i2 <= 90; i2++) {
      base[i2] = String.fromCharCode(i2 + 32);
      shift[i2] = String.fromCharCode(i2);
    }
    for (code in base)
      if (!shift.hasOwnProperty(code))
        shift[code] = base[code];
  }
});

// node_modules/@codemirror/view/dist/index.js
function getSelection(root) {
  let target;
  if (root.nodeType == 11) {
    target = root.getSelection ? root : root.ownerDocument;
  } else {
    target = root;
  }
  return target.getSelection();
}
function contains(dom, node) {
  return node ? dom.contains(node.nodeType != 1 ? node.parentNode : node) : false;
}
function deepActiveElement() {
  let elt = document.activeElement;
  while (elt && elt.shadowRoot)
    elt = elt.shadowRoot.activeElement;
  return elt;
}
function hasSelection(dom, selection) {
  if (!selection.anchorNode)
    return false;
  try {
    return contains(dom, selection.anchorNode);
  } catch (_) {
    return false;
  }
}
function clientRectsFor(dom) {
  if (dom.nodeType == 3)
    return textRange(dom, 0, dom.nodeValue.length).getClientRects();
  else if (dom.nodeType == 1)
    return dom.getClientRects();
  else
    return [];
}
function isEquivalentPosition(node, off, targetNode, targetOff) {
  return targetNode ? scanFor(node, off, targetNode, targetOff, -1) || scanFor(node, off, targetNode, targetOff, 1) : false;
}
function domIndex(node) {
  for (var index2 = 0; ; index2++) {
    node = node.previousSibling;
    if (!node)
      return index2;
  }
}
function scanFor(node, off, targetNode, targetOff, dir) {
  for (; ; ) {
    if (node == targetNode && off == targetOff)
      return true;
    if (off == (dir < 0 ? 0 : maxOffset(node))) {
      if (node.nodeName == "DIV")
        return false;
      let parent = node.parentNode;
      if (!parent || parent.nodeType != 1)
        return false;
      off = domIndex(node) + (dir < 0 ? 0 : 1);
      node = parent;
    } else if (node.nodeType == 1) {
      node = node.childNodes[off + (dir < 0 ? -1 : 0)];
      if (node.nodeType == 1 && node.contentEditable == "false")
        return false;
      off = dir < 0 ? maxOffset(node) : 0;
    } else {
      return false;
    }
  }
}
function maxOffset(node) {
  return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
}
function flattenRect(rect, left) {
  let x2 = left ? rect.left : rect.right;
  return { left: x2, right: x2, top: rect.top, bottom: rect.bottom };
}
function windowRect(win) {
  return {
    left: 0,
    right: win.innerWidth,
    top: 0,
    bottom: win.innerHeight
  };
}
function scrollRectIntoView(dom, rect, side, x2, y, xMargin, yMargin, ltr) {
  let doc2 = dom.ownerDocument, win = doc2.defaultView;
  for (let cur = dom; cur; ) {
    if (cur.nodeType == 1) {
      let bounding, top2 = cur == doc2.body;
      if (top2) {
        bounding = windowRect(win);
      } else {
        if (cur.scrollHeight <= cur.clientHeight && cur.scrollWidth <= cur.clientWidth) {
          cur = cur.parentNode;
          continue;
        }
        let rect2 = cur.getBoundingClientRect();
        bounding = {
          left: rect2.left,
          right: rect2.left + cur.clientWidth,
          top: rect2.top,
          bottom: rect2.top + cur.clientHeight
        };
      }
      let moveX = 0, moveY = 0;
      if (y == "nearest") {
        if (rect.top < bounding.top) {
          moveY = -(bounding.top - rect.top + yMargin);
          if (side > 0 && rect.bottom > bounding.bottom + moveY)
            moveY = rect.bottom - bounding.bottom + moveY + yMargin;
        } else if (rect.bottom > bounding.bottom) {
          moveY = rect.bottom - bounding.bottom + yMargin;
          if (side < 0 && rect.top - moveY < bounding.top)
            moveY = -(bounding.top + moveY - rect.top + yMargin);
        }
      } else {
        let rectHeight = rect.bottom - rect.top, boundingHeight = bounding.bottom - bounding.top;
        let targetTop = y == "center" && rectHeight <= boundingHeight ? rect.top + rectHeight / 2 - boundingHeight / 2 : y == "start" || y == "center" && side < 0 ? rect.top - yMargin : rect.bottom - boundingHeight + yMargin;
        moveY = targetTop - bounding.top;
      }
      if (x2 == "nearest") {
        if (rect.left < bounding.left) {
          moveX = -(bounding.left - rect.left + xMargin);
          if (side > 0 && rect.right > bounding.right + moveX)
            moveX = rect.right - bounding.right + moveX + xMargin;
        } else if (rect.right > bounding.right) {
          moveX = rect.right - bounding.right + xMargin;
          if (side < 0 && rect.left < bounding.left + moveX)
            moveX = -(bounding.left + moveX - rect.left + xMargin);
        }
      } else {
        let targetLeft = x2 == "center" ? rect.left + (rect.right - rect.left) / 2 - (bounding.right - bounding.left) / 2 : x2 == "start" == ltr ? rect.left - xMargin : rect.right - (bounding.right - bounding.left) + xMargin;
        moveX = targetLeft - bounding.left;
      }
      if (moveX || moveY) {
        if (top2) {
          win.scrollBy(moveX, moveY);
        } else {
          if (moveY) {
            let start = cur.scrollTop;
            cur.scrollTop += moveY;
            moveY = cur.scrollTop - start;
          }
          if (moveX) {
            let start = cur.scrollLeft;
            cur.scrollLeft += moveX;
            moveX = cur.scrollLeft - start;
          }
          rect = {
            left: rect.left - moveX,
            top: rect.top - moveY,
            right: rect.right - moveX,
            bottom: rect.bottom - moveY
          };
        }
      }
      if (top2)
        break;
      cur = cur.assignedSlot || cur.parentNode;
      x2 = y = "nearest";
    } else if (cur.nodeType == 11) {
      cur = cur.host;
    } else {
      break;
    }
  }
}
function focusPreventScroll(dom) {
  if (dom.setActive)
    return dom.setActive();
  if (preventScrollSupported)
    return dom.focus(preventScrollSupported);
  let stack = [];
  for (let cur = dom; cur; cur = cur.parentNode) {
    stack.push(cur, cur.scrollTop, cur.scrollLeft);
    if (cur == cur.ownerDocument)
      break;
  }
  dom.focus(preventScrollSupported == null ? {
    get preventScroll() {
      preventScrollSupported = { preventScroll: true };
      return true;
    }
  } : void 0);
  if (!preventScrollSupported) {
    preventScrollSupported = false;
    for (let i2 = 0; i2 < stack.length; ) {
      let elt = stack[i2++], top2 = stack[i2++], left = stack[i2++];
      if (elt.scrollTop != top2)
        elt.scrollTop = top2;
      if (elt.scrollLeft != left)
        elt.scrollLeft = left;
    }
  }
}
function textRange(node, from, to = from) {
  let range2 = scratchRange || (scratchRange = document.createRange());
  range2.setEnd(node, to);
  range2.setStart(node, from);
  return range2;
}
function dispatchKey(elt, name2, code) {
  let options2 = { key: name2, code: name2, keyCode: code, which: code, cancelable: true };
  let down = new KeyboardEvent("keydown", options2);
  down.synthetic = true;
  elt.dispatchEvent(down);
  let up = new KeyboardEvent("keyup", options2);
  up.synthetic = true;
  elt.dispatchEvent(up);
  return down.defaultPrevented || up.defaultPrevented;
}
function getRoot(node) {
  while (node) {
    if (node && (node.nodeType == 9 || node.nodeType == 11 && node.host))
      return node;
    node = node.assignedSlot || node.parentNode;
  }
  return null;
}
function clearAttributes(node) {
  while (node.attributes.length)
    node.removeAttributeNode(node.attributes[0]);
}
function rm(dom) {
  let next = dom.nextSibling;
  dom.parentNode.removeChild(dom);
  return next;
}
function replaceRange(parent, fromI, fromOff, toI, toOff, insert2, breakAtStart, openStart, openEnd) {
  let { children } = parent;
  let before = children.length ? children[fromI] : null;
  let last = insert2.length ? insert2[insert2.length - 1] : null;
  let breakAtEnd = last ? last.breakAfter : breakAtStart;
  if (fromI == toI && before && !breakAtStart && !breakAtEnd && insert2.length < 2 && before.merge(fromOff, toOff, insert2.length ? last : null, fromOff == 0, openStart, openEnd))
    return;
  if (toI < children.length) {
    let after = children[toI];
    if (after && toOff < after.length) {
      if (fromI == toI) {
        after = after.split(toOff);
        toOff = 0;
      }
      if (!breakAtEnd && last && after.merge(0, toOff, last, true, 0, openEnd)) {
        insert2[insert2.length - 1] = after;
      } else {
        if (toOff)
          after.merge(0, toOff, null, false, 0, openEnd);
        insert2.push(after);
      }
    } else if (after === null || after === void 0 ? void 0 : after.breakAfter) {
      if (last)
        last.breakAfter = 1;
      else
        breakAtStart = 1;
    }
    toI++;
  }
  if (before) {
    before.breakAfter = breakAtStart;
    if (fromOff > 0) {
      if (!breakAtStart && insert2.length && before.merge(fromOff, before.length, insert2[0], false, openStart, 0)) {
        before.breakAfter = insert2.shift().breakAfter;
      } else if (fromOff < before.length || before.children.length && before.children[before.children.length - 1].length == 0) {
        before.merge(fromOff, before.length, null, false, openStart, 0);
      }
      fromI++;
    }
  }
  while (fromI < toI && insert2.length) {
    if (children[toI - 1].become(insert2[insert2.length - 1])) {
      toI--;
      insert2.pop();
      openEnd = insert2.length ? 0 : openStart;
    } else if (children[fromI].become(insert2[0])) {
      fromI++;
      insert2.shift();
      openStart = insert2.length ? 0 : openEnd;
    } else {
      break;
    }
  }
  if (!insert2.length && fromI && toI < children.length && !children[fromI - 1].breakAfter && children[toI].merge(0, 0, children[fromI - 1], false, openStart, openEnd))
    fromI--;
  if (fromI < toI || insert2.length)
    parent.replaceChildren(fromI, toI, insert2);
}
function mergeChildrenInto(parent, from, to, insert2, openStart, openEnd) {
  let cur = parent.childCursor();
  let { i: toI, off: toOff } = cur.findPos(to, 1);
  let { i: fromI, off: fromOff } = cur.findPos(from, -1);
  let dLen = from - to;
  for (let view of insert2)
    dLen += view.length;
  parent.length += dLen;
  replaceRange(parent, fromI, fromOff, toI, toOff, insert2, 0, openStart, openEnd);
}
function textCoords(text, pos, side) {
  let length = text.nodeValue.length;
  if (pos > length)
    pos = length;
  let from = pos, to = pos, flatten2 = 0;
  if (pos == 0 && side < 0 || pos == length && side >= 0) {
    if (!(browser.chrome || browser.gecko)) {
      if (pos) {
        from--;
        flatten2 = 1;
      } else {
        to++;
        flatten2 = -1;
      }
    }
  } else {
    if (side < 0)
      from--;
    else
      to++;
  }
  let rects = textRange(text, from, to).getClientRects();
  if (!rects.length)
    return Rect0;
  let rect = rects[(flatten2 ? flatten2 < 0 : side >= 0) ? 0 : rects.length - 1];
  if (browser.safari && !flatten2 && rect.width == 0)
    rect = Array.prototype.find.call(rects, (r2) => r2.width) || rect;
  return flatten2 ? flattenRect(rect, flatten2 < 0) : rect || null;
}
function inlineDOMAtPos(dom, children, pos) {
  let i2 = 0;
  for (let off = 0; i2 < children.length; i2++) {
    let child = children[i2], end = off + child.length;
    if (end == off && child.getSide() <= 0)
      continue;
    if (pos > off && pos < end && child.dom.parentNode == dom)
      return child.domAtPos(pos - off);
    if (pos <= off)
      break;
    off = end;
  }
  for (; i2 > 0; i2--) {
    let before = children[i2 - 1].dom;
    if (before.parentNode == dom)
      return DOMPos.after(before);
  }
  return new DOMPos(dom, 0);
}
function joinInlineInto(parent, view, open) {
  let last, { children } = parent;
  if (open > 0 && view instanceof MarkView && children.length && (last = children[children.length - 1]) instanceof MarkView && last.mark.eq(view.mark)) {
    joinInlineInto(last, view.children[0], open - 1);
  } else {
    children.push(view);
    view.setParent(parent);
  }
  parent.length += view.length;
}
function coordsInChildren(view, pos, side) {
  for (let off = 0, i2 = 0; i2 < view.children.length; i2++) {
    let child = view.children[i2], end = off + child.length, next;
    if ((side <= 0 || end == view.length || child.getSide() > 0 ? end >= pos : end > pos) && (pos < end || i2 + 1 == view.children.length || (next = view.children[i2 + 1]).length || next.getSide() > 0)) {
      let flatten2 = 0;
      if (end == off) {
        if (child.getSide() <= 0)
          continue;
        flatten2 = side = -child.getSide();
      }
      let rect = child.coordsAt(pos - off, side);
      return flatten2 && rect ? flattenRect(rect, side < 0) : rect;
    }
    off = end;
  }
  let last = view.dom.lastChild;
  if (!last)
    return view.dom.getBoundingClientRect();
  let rects = clientRectsFor(last);
  return rects[rects.length - 1] || null;
}
function combineAttrs(source, target) {
  for (let name2 in source) {
    if (name2 == "class" && target.class)
      target.class += " " + source.class;
    else if (name2 == "style" && target.style)
      target.style += ";" + source.style;
    else
      target[name2] = source[name2];
  }
  return target;
}
function attrsEq(a, b) {
  if (a == b)
    return true;
  if (!a || !b)
    return false;
  let keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length != keysB.length)
    return false;
  for (let key of keysA) {
    if (keysB.indexOf(key) == -1 || a[key] !== b[key])
      return false;
  }
  return true;
}
function updateAttrs(dom, prev, attrs) {
  if (prev) {
    for (let name2 in prev)
      if (!(attrs && name2 in attrs))
        dom.removeAttribute(name2);
  }
  if (attrs) {
    for (let name2 in attrs)
      if (!(prev && prev[name2] == attrs[name2]))
        dom.setAttribute(name2, attrs[name2]);
  }
}
function getInclusive(spec, block = false) {
  let { inclusiveStart: start, inclusiveEnd: end } = spec;
  if (start == null)
    start = spec.inclusive;
  if (end == null)
    end = spec.inclusive;
  return { start: start !== null && start !== void 0 ? start : block, end: end !== null && end !== void 0 ? end : block };
}
function widgetsEq(a, b) {
  return a == b || !!(a && b && a.compare(b));
}
function addRange(from, to, ranges, margin = 0) {
  let last = ranges.length - 1;
  if (last >= 0 && ranges[last] + margin > from)
    ranges[last] = Math.max(ranges[last], to);
  else
    ranges.push(from, to);
}
function wrapMarks(view, active) {
  for (let mark of active)
    view = new MarkView(mark, [view], view.length);
  return view;
}
function logException(state, exception, context) {
  let handler2 = state.facet(exceptionSink);
  if (handler2.length)
    handler2[0](exception);
  else if (window.onerror)
    window.onerror(String(exception), context, void 0, void 0, exception);
  else if (context)
    console.error(context + ":", exception);
  else
    console.error(exception);
}
function dec(str) {
  let result = [];
  for (let i2 = 0; i2 < str.length; i2++)
    result.push(1 << +str[i2]);
  return result;
}
function charType(ch) {
  return ch <= 247 ? LowTypes[ch] : 1424 <= ch && ch <= 1524 ? 2 : 1536 <= ch && ch <= 1785 ? ArabicTypes[ch - 1536] : 1774 <= ch && ch <= 2220 ? 4 : 8192 <= ch && ch <= 8203 ? 256 : ch == 8204 ? 256 : 1;
}
function computeOrder(line, direction) {
  let len = line.length, outerType = direction == LTR ? 1 : 2, oppositeType = direction == LTR ? 2 : 1;
  if (!line || outerType == 1 && !BidiRE.test(line))
    return trivialOrder(len);
  for (let i2 = 0, prev = outerType, prevStrong = outerType; i2 < len; i2++) {
    let type = charType(line.charCodeAt(i2));
    if (type == 512)
      type = prev;
    else if (type == 8 && prevStrong == 4)
      type = 16;
    types2[i2] = type == 4 ? 2 : type;
    if (type & 7)
      prevStrong = type;
    prev = type;
  }
  for (let i2 = 0, prev = outerType, prevStrong = outerType; i2 < len; i2++) {
    let type = types2[i2];
    if (type == 128) {
      if (i2 < len - 1 && prev == types2[i2 + 1] && prev & 24)
        type = types2[i2] = prev;
      else
        types2[i2] = 256;
    } else if (type == 64) {
      let end = i2 + 1;
      while (end < len && types2[end] == 64)
        end++;
      let replace = i2 && prev == 8 || end < len && types2[end] == 8 ? prevStrong == 1 ? 1 : 8 : 256;
      for (let j = i2; j < end; j++)
        types2[j] = replace;
      i2 = end - 1;
    } else if (type == 8 && prevStrong == 1) {
      types2[i2] = 1;
    }
    prev = type;
    if (type & 7)
      prevStrong = type;
  }
  for (let i2 = 0, sI = 0, context = 0, ch, br, type; i2 < len; i2++) {
    if (br = Brackets[ch = line.charCodeAt(i2)]) {
      if (br < 0) {
        for (let sJ = sI - 3; sJ >= 0; sJ -= 3) {
          if (BracketStack[sJ + 1] == -br) {
            let flags = BracketStack[sJ + 2];
            let type2 = flags & 2 ? outerType : !(flags & 4) ? 0 : flags & 1 ? oppositeType : outerType;
            if (type2)
              types2[i2] = types2[BracketStack[sJ]] = type2;
            sI = sJ;
            break;
          }
        }
      } else if (BracketStack.length == 189) {
        break;
      } else {
        BracketStack[sI++] = i2;
        BracketStack[sI++] = ch;
        BracketStack[sI++] = context;
      }
    } else if ((type = types2[i2]) == 2 || type == 1) {
      let embed = type == outerType;
      context = embed ? 0 : 1;
      for (let sJ = sI - 3; sJ >= 0; sJ -= 3) {
        let cur = BracketStack[sJ + 2];
        if (cur & 2)
          break;
        if (embed) {
          BracketStack[sJ + 2] |= 2;
        } else {
          if (cur & 4)
            break;
          BracketStack[sJ + 2] |= 4;
        }
      }
    }
  }
  for (let i2 = 0; i2 < len; i2++) {
    if (types2[i2] == 256) {
      let end = i2 + 1;
      while (end < len && types2[end] == 256)
        end++;
      let beforeL = (i2 ? types2[i2 - 1] : outerType) == 1;
      let afterL = (end < len ? types2[end] : outerType) == 1;
      let replace = beforeL == afterL ? beforeL ? 1 : 2 : outerType;
      for (let j = i2; j < end; j++)
        types2[j] = replace;
      i2 = end - 1;
    }
  }
  let order = [];
  if (outerType == 1) {
    for (let i2 = 0; i2 < len; ) {
      let start = i2, rtl = types2[i2++] != 1;
      while (i2 < len && rtl == (types2[i2] != 1))
        i2++;
      if (rtl) {
        for (let j = i2; j > start; ) {
          let end = j, l = types2[--j] != 2;
          while (j > start && l == (types2[j - 1] != 2))
            j--;
          order.push(new BidiSpan(j, end, l ? 2 : 1));
        }
      } else {
        order.push(new BidiSpan(start, i2, 0));
      }
    }
  } else {
    for (let i2 = 0; i2 < len; ) {
      let start = i2, rtl = types2[i2++] == 2;
      while (i2 < len && rtl == (types2[i2] == 2))
        i2++;
      order.push(new BidiSpan(start, i2, rtl ? 1 : 2));
    }
  }
  return order;
}
function trivialOrder(length) {
  return [new BidiSpan(0, length, 0)];
}
function moveVisually(line, order, dir, start, forward) {
  var _a;
  let startIndex = start.head - line.from, spanI = -1;
  if (startIndex == 0) {
    if (!forward || !line.length)
      return null;
    if (order[0].level != dir) {
      startIndex = order[0].side(false, dir);
      spanI = 0;
    }
  } else if (startIndex == line.length) {
    if (forward)
      return null;
    let last = order[order.length - 1];
    if (last.level != dir) {
      startIndex = last.side(true, dir);
      spanI = order.length - 1;
    }
  }
  if (spanI < 0)
    spanI = BidiSpan.find(order, startIndex, (_a = start.bidiLevel) !== null && _a !== void 0 ? _a : -1, start.assoc);
  let span = order[spanI];
  if (startIndex == span.side(forward, dir)) {
    span = order[spanI += forward ? 1 : -1];
    startIndex = span.side(!forward, dir);
  }
  let indexForward = forward == (span.dir == dir);
  let nextIndex = findClusterBreak(line.text, startIndex, indexForward);
  movedOver = line.text.slice(Math.min(startIndex, nextIndex), Math.max(startIndex, nextIndex));
  if (nextIndex != span.side(forward, dir))
    return EditorSelection.cursor(nextIndex + line.from, indexForward ? -1 : 1, span.level);
  let nextSpan = spanI == (forward ? order.length - 1 : 0) ? null : order[spanI + (forward ? 1 : -1)];
  if (!nextSpan && span.level != dir)
    return EditorSelection.cursor(forward ? line.to : line.from, forward ? -1 : 1, dir);
  if (nextSpan && nextSpan.level < span.level)
    return EditorSelection.cursor(nextSpan.side(!forward, dir) + line.from, forward ? 1 : -1, nextSpan.level);
  return EditorSelection.cursor(nextIndex + line.from, forward ? -1 : 1, span.level);
}
function isBlockElement(node) {
  return node.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(node.nodeName);
}
function betweenUneditable(pos) {
  return pos.node.nodeType == 1 && pos.node.firstChild && (pos.offset == 0 || pos.node.childNodes[pos.offset - 1].contentEditable == "false") && (pos.offset == pos.node.childNodes.length || pos.node.childNodes[pos.offset].contentEditable == "false");
}
function computeCompositionDeco(view, changes) {
  let sel = view.observer.selectionRange;
  let textNode = sel.focusNode && nearbyTextNode(sel.focusNode, sel.focusOffset, 0);
  if (!textNode)
    return Decoration.none;
  let cView = view.docView.nearest(textNode);
  if (!cView)
    return Decoration.none;
  let from, to, topNode = textNode;
  if (cView instanceof LineView) {
    while (topNode.parentNode != cView.dom)
      topNode = topNode.parentNode;
    let prev = topNode.previousSibling;
    while (prev && !ContentView.get(prev))
      prev = prev.previousSibling;
    from = to = prev ? ContentView.get(prev).posAtEnd : cView.posAtStart;
  } else {
    for (; ; ) {
      let { parent } = cView;
      if (!parent)
        return Decoration.none;
      if (parent instanceof LineView)
        break;
      cView = parent;
    }
    from = cView.posAtStart;
    to = from + cView.length;
    topNode = cView.dom;
  }
  let newFrom = changes.mapPos(from, 1), newTo = Math.max(newFrom, changes.mapPos(to, -1));
  let { state } = view, text = topNode.nodeType == 3 ? topNode.nodeValue : new DOMReader([], view).readRange(topNode.firstChild, null).text;
  if (newTo - newFrom < text.length) {
    if (state.sliceDoc(newFrom, Math.min(state.doc.length, newFrom + text.length)) == text)
      newTo = newFrom + text.length;
    else if (state.sliceDoc(Math.max(0, newTo - text.length), newTo) == text)
      newFrom = newTo - text.length;
    else
      return Decoration.none;
  } else if (state.sliceDoc(newFrom, newTo) != text) {
    return Decoration.none;
  }
  return Decoration.set(Decoration.replace({ widget: new CompositionWidget(topNode, textNode) }).range(newFrom, newTo));
}
function nearbyTextNode(node, offset, side) {
  for (; ; ) {
    if (node.nodeType == 3)
      return node;
    if (node.nodeType == 1 && offset > 0 && side <= 0) {
      node = node.childNodes[offset - 1];
      offset = maxOffset(node);
    } else if (node.nodeType == 1 && offset < node.childNodes.length && side >= 0) {
      node = node.childNodes[offset];
      offset = 0;
    } else {
      return null;
    }
  }
}
function nextToUneditable(node, offset) {
  if (node.nodeType != 1)
    return 0;
  return (offset && node.childNodes[offset - 1].contentEditable == "false" ? 1 : 0) | (offset < node.childNodes.length && node.childNodes[offset].contentEditable == "false" ? 2 : 0);
}
function findChangedDeco(a, b, diff) {
  let comp = new DecorationComparator$1();
  RangeSet.compare(a, b, diff, comp);
  return comp.changes;
}
function inUneditable(node, inside2) {
  for (let cur = node; cur && cur != inside2; cur = cur.assignedSlot || cur.parentNode) {
    if (cur.nodeType == 1 && cur.contentEditable == "false") {
      return true;
    }
  }
  return false;
}
function groupAt(state, pos, bias = 1) {
  let categorize = state.charCategorizer(pos);
  let line = state.doc.lineAt(pos), linePos = pos - line.from;
  if (line.length == 0)
    return EditorSelection.cursor(pos);
  if (linePos == 0)
    bias = 1;
  else if (linePos == line.length)
    bias = -1;
  let from = linePos, to = linePos;
  if (bias < 0)
    from = findClusterBreak(line.text, linePos, false);
  else
    to = findClusterBreak(line.text, linePos);
  let cat = categorize(line.text.slice(from, to));
  while (from > 0) {
    let prev = findClusterBreak(line.text, from, false);
    if (categorize(line.text.slice(prev, from)) != cat)
      break;
    from = prev;
  }
  while (to < line.length) {
    let next = findClusterBreak(line.text, to);
    if (categorize(line.text.slice(to, next)) != cat)
      break;
    to = next;
  }
  return EditorSelection.range(from + line.from, to + line.from);
}
function getdx(x2, rect) {
  return rect.left > x2 ? rect.left - x2 : Math.max(0, x2 - rect.right);
}
function getdy(y, rect) {
  return rect.top > y ? rect.top - y : Math.max(0, y - rect.bottom);
}
function yOverlap(a, b) {
  return a.top < b.bottom - 1 && a.bottom > b.top + 1;
}
function upTop(rect, top2) {
  return top2 < rect.top ? { top: top2, left: rect.left, right: rect.right, bottom: rect.bottom } : rect;
}
function upBot(rect, bottom) {
  return bottom > rect.bottom ? { top: rect.top, left: rect.left, right: rect.right, bottom } : rect;
}
function domPosAtCoords(parent, x2, y) {
  let closest, closestRect, closestX, closestY;
  let above, below, aboveRect, belowRect;
  for (let child = parent.firstChild; child; child = child.nextSibling) {
    let rects = clientRectsFor(child);
    for (let i2 = 0; i2 < rects.length; i2++) {
      let rect = rects[i2];
      if (closestRect && yOverlap(closestRect, rect))
        rect = upTop(upBot(rect, closestRect.bottom), closestRect.top);
      let dx = getdx(x2, rect), dy = getdy(y, rect);
      if (dx == 0 && dy == 0)
        return child.nodeType == 3 ? domPosInText(child, x2, y) : domPosAtCoords(child, x2, y);
      if (!closest || closestY > dy || closestY == dy && closestX > dx) {
        closest = child;
        closestRect = rect;
        closestX = dx;
        closestY = dy;
      }
      if (dx == 0) {
        if (y > rect.bottom && (!aboveRect || aboveRect.bottom < rect.bottom)) {
          above = child;
          aboveRect = rect;
        } else if (y < rect.top && (!belowRect || belowRect.top > rect.top)) {
          below = child;
          belowRect = rect;
        }
      } else if (aboveRect && yOverlap(aboveRect, rect)) {
        aboveRect = upBot(aboveRect, rect.bottom);
      } else if (belowRect && yOverlap(belowRect, rect)) {
        belowRect = upTop(belowRect, rect.top);
      }
    }
  }
  if (aboveRect && aboveRect.bottom >= y) {
    closest = above;
    closestRect = aboveRect;
  } else if (belowRect && belowRect.top <= y) {
    closest = below;
    closestRect = belowRect;
  }
  if (!closest)
    return { node: parent, offset: 0 };
  let clipX = Math.max(closestRect.left, Math.min(closestRect.right, x2));
  if (closest.nodeType == 3)
    return domPosInText(closest, clipX, y);
  if (!closestX && closest.contentEditable == "true")
    return domPosAtCoords(closest, clipX, y);
  let offset = Array.prototype.indexOf.call(parent.childNodes, closest) + (x2 >= (closestRect.left + closestRect.right) / 2 ? 1 : 0);
  return { node: parent, offset };
}
function domPosInText(node, x2, y) {
  let len = node.nodeValue.length;
  let closestOffset = -1, closestDY = 1e9, generalSide = 0;
  for (let i2 = 0; i2 < len; i2++) {
    let rects = textRange(node, i2, i2 + 1).getClientRects();
    for (let j = 0; j < rects.length; j++) {
      let rect = rects[j];
      if (rect.top == rect.bottom)
        continue;
      if (!generalSide)
        generalSide = x2 - rect.left;
      let dy = (rect.top > y ? rect.top - y : y - rect.bottom) - 1;
      if (rect.left - 1 <= x2 && rect.right + 1 >= x2 && dy < closestDY) {
        let right = x2 >= (rect.left + rect.right) / 2, after = right;
        if (browser.chrome || browser.gecko) {
          let rectBefore = textRange(node, i2).getBoundingClientRect();
          if (rectBefore.left == rect.right)
            after = !right;
        }
        if (dy <= 0)
          return { node, offset: i2 + (after ? 1 : 0) };
        closestOffset = i2 + (after ? 1 : 0);
        closestDY = dy;
      }
    }
  }
  return { node, offset: closestOffset > -1 ? closestOffset : generalSide > 0 ? node.nodeValue.length : 0 };
}
function posAtCoords(view, { x: x2, y }, precise, bias = -1) {
  var _a;
  let content2 = view.contentDOM.getBoundingClientRect(), docTop = content2.top + view.viewState.paddingTop;
  let block, { docHeight } = view.viewState;
  let yOffset = Math.max(0, Math.min(y - docTop, docHeight));
  for (let halfLine = view.defaultLineHeight / 2, bounced = false; ; ) {
    block = view.elementAtHeight(yOffset);
    if (block.type == BlockType.Text)
      break;
    for (; ; ) {
      yOffset = bias > 0 ? block.bottom + halfLine : block.top - halfLine;
      if (yOffset >= 0 && yOffset <= docHeight)
        break;
      if (bounced)
        return precise ? null : 0;
      bounced = true;
      bias = -bias;
    }
  }
  y = docTop + yOffset;
  let lineStart = block.from;
  if (lineStart < view.viewport.from)
    return view.viewport.from == 0 ? 0 : precise ? null : posAtCoordsImprecise(view, content2, block, x2, y);
  if (lineStart > view.viewport.to)
    return view.viewport.to == view.state.doc.length ? view.state.doc.length : precise ? null : posAtCoordsImprecise(view, content2, block, x2, y);
  let doc2 = view.dom.ownerDocument;
  let root = view.root.elementFromPoint ? view.root : doc2;
  let element = root.elementFromPoint(x2, y);
  if (element && !view.contentDOM.contains(element))
    element = null;
  if (!element) {
    x2 = Math.max(content2.left + 1, Math.min(content2.right - 1, x2));
    element = root.elementFromPoint(x2, y);
    if (element && !view.contentDOM.contains(element))
      element = null;
  }
  let node, offset = -1;
  if (element && ((_a = view.docView.nearest(element)) === null || _a === void 0 ? void 0 : _a.isEditable) != false) {
    if (doc2.caretPositionFromPoint) {
      let pos = doc2.caretPositionFromPoint(x2, y);
      if (pos)
        ({ offsetNode: node, offset } = pos);
    } else if (doc2.caretRangeFromPoint) {
      let range2 = doc2.caretRangeFromPoint(x2, y);
      if (range2) {
        ({ startContainer: node, startOffset: offset } = range2);
        if (browser.safari && isSuspiciousCaretResult(node, offset, x2))
          node = void 0;
      }
    }
  }
  if (!node || !view.docView.dom.contains(node)) {
    let line = LineView.find(view.docView, lineStart);
    if (!line)
      return yOffset > block.top + block.height / 2 ? block.to : block.from;
    ({ node, offset } = domPosAtCoords(line.dom, x2, y));
  }
  return view.docView.posFromDOM(node, offset);
}
function posAtCoordsImprecise(view, contentRect, block, x2, y) {
  let into = Math.round((x2 - contentRect.left) * view.defaultCharacterWidth);
  if (view.lineWrapping && block.height > view.defaultLineHeight * 1.5) {
    let line = Math.floor((y - block.top) / view.defaultLineHeight);
    into += line * view.viewState.heightOracle.lineLength;
  }
  let content2 = view.state.sliceDoc(block.from, block.to);
  return block.from + findColumn(content2, into, view.state.tabSize);
}
function isSuspiciousCaretResult(node, offset, x2) {
  let len;
  if (node.nodeType != 3 || offset != (len = node.nodeValue.length))
    return false;
  for (let next = node.nextSibling; next; next = next.nextSibling)
    if (next.nodeType != 1 || next.nodeName != "BR")
      return false;
  return textRange(node, len - 1, len).getBoundingClientRect().left > x2;
}
function moveToLineBoundary(view, start, forward, includeWrap) {
  let line = view.state.doc.lineAt(start.head);
  let coords = !includeWrap || !view.lineWrapping ? null : view.coordsAtPos(start.assoc < 0 && start.head > line.from ? start.head - 1 : start.head);
  if (coords) {
    let editorRect = view.dom.getBoundingClientRect();
    let pos = view.posAtCoords({
      x: forward == (view.textDirection == Direction.LTR) ? editorRect.right - 1 : editorRect.left + 1,
      y: (coords.top + coords.bottom) / 2
    });
    if (pos != null)
      return EditorSelection.cursor(pos, forward ? -1 : 1);
  }
  let lineView = LineView.find(view.docView, start.head);
  let end = lineView ? forward ? lineView.posAtEnd : lineView.posAtStart : forward ? line.to : line.from;
  return EditorSelection.cursor(end, forward ? -1 : 1);
}
function moveByChar(view, start, forward, by) {
  let line = view.state.doc.lineAt(start.head), spans = view.bidiSpans(line);
  for (let cur = start, check = null; ; ) {
    let next = moveVisually(line, spans, view.textDirection, cur, forward), char = movedOver;
    if (!next) {
      if (line.number == (forward ? view.state.doc.lines : 1))
        return cur;
      char = "\n";
      line = view.state.doc.line(line.number + (forward ? 1 : -1));
      spans = view.bidiSpans(line);
      next = EditorSelection.cursor(forward ? line.from : line.to);
    }
    if (!check) {
      if (!by)
        return next;
      check = by(char);
    } else if (!check(char)) {
      return cur;
    }
    cur = next;
  }
}
function byGroup(view, pos, start) {
  let categorize = view.state.charCategorizer(pos);
  let cat = categorize(start);
  return (next) => {
    let nextCat = categorize(next);
    if (cat == CharCategory.Space)
      cat = nextCat;
    return cat == nextCat;
  };
}
function moveVertically(view, start, forward, distance) {
  let startPos = start.head, dir = forward ? 1 : -1;
  if (startPos == (forward ? view.state.doc.length : 0))
    return EditorSelection.cursor(startPos);
  let goal = start.goalColumn, startY;
  let rect = view.contentDOM.getBoundingClientRect();
  let startCoords = view.coordsAtPos(startPos), docTop = view.documentTop;
  if (startCoords) {
    if (goal == null)
      goal = startCoords.left - rect.left;
    startY = dir < 0 ? startCoords.top : startCoords.bottom;
  } else {
    let line = view.viewState.lineBlockAt(startPos - docTop);
    if (goal == null)
      goal = Math.min(rect.right - rect.left, view.defaultCharacterWidth * (startPos - line.from));
    startY = (dir < 0 ? line.top : line.bottom) + docTop;
  }
  let resolvedGoal = rect.left + goal;
  let dist = distance !== null && distance !== void 0 ? distance : view.defaultLineHeight >> 1;
  for (let extra = 0; ; extra += 10) {
    let curY = startY + (dist + extra) * dir;
    let pos = posAtCoords(view, { x: resolvedGoal, y: curY }, false, dir);
    if (curY < rect.top || curY > rect.bottom || (dir < 0 ? pos < startPos : pos > startPos))
      return EditorSelection.cursor(pos, void 0, void 0, goal);
  }
}
function skipAtoms(view, oldPos, pos) {
  let atoms = view.pluginField(PluginField.atomicRanges);
  for (; ; ) {
    let moved = false;
    for (let set of atoms) {
      set.between(pos.from - 1, pos.from + 1, (from, to, value) => {
        if (pos.from > from && pos.from < to) {
          pos = oldPos.from > pos.from ? EditorSelection.cursor(from, 1) : EditorSelection.cursor(to, -1);
          moved = true;
        }
      });
    }
    if (!moved)
      return pos;
  }
}
function addsSelectionRange(view, event) {
  let facet = view.state.facet(clickAddsSelectionRange);
  return facet.length ? facet[0](event) : browser.mac ? event.metaKey : event.ctrlKey;
}
function dragMovesSelection(view, event) {
  let facet = view.state.facet(dragMovesSelection$1);
  return facet.length ? facet[0](event) : browser.mac ? !event.altKey : !event.ctrlKey;
}
function isInPrimarySelection(view, event) {
  let { main } = view.state.selection;
  if (main.empty)
    return false;
  let sel = getSelection(view.root);
  if (sel.rangeCount == 0)
    return true;
  let rects = sel.getRangeAt(0).getClientRects();
  for (let i2 = 0; i2 < rects.length; i2++) {
    let rect = rects[i2];
    if (rect.left <= event.clientX && rect.right >= event.clientX && rect.top <= event.clientY && rect.bottom >= event.clientY)
      return true;
  }
  return false;
}
function eventBelongsToEditor(view, event) {
  if (!event.bubbles)
    return true;
  if (event.defaultPrevented)
    return false;
  for (let node = event.target, cView; node != view.contentDOM; node = node.parentNode)
    if (!node || node.nodeType == 11 || (cView = ContentView.get(node)) && cView.ignoreEvent(event))
      return false;
  return true;
}
function capturePaste(view) {
  let parent = view.dom.parentNode;
  if (!parent)
    return;
  let target = parent.appendChild(document.createElement("textarea"));
  target.style.cssText = "position: fixed; left: -10000px; top: 10px";
  target.focus();
  setTimeout(() => {
    view.focus();
    target.remove();
    doPaste(view, target.value);
  }, 50);
}
function doPaste(view, input) {
  let { state } = view, changes, i2 = 1, text = state.toText(input);
  let byLine = text.lines == state.selection.ranges.length;
  let linewise = lastLinewiseCopy != null && state.selection.ranges.every((r2) => r2.empty) && lastLinewiseCopy == text.toString();
  if (linewise) {
    let lastLine = -1;
    changes = state.changeByRange((range2) => {
      let line = state.doc.lineAt(range2.from);
      if (line.from == lastLine)
        return { range: range2 };
      lastLine = line.from;
      let insert2 = state.toText((byLine ? text.line(i2++).text : input) + state.lineBreak);
      return {
        changes: { from: line.from, insert: insert2 },
        range: EditorSelection.cursor(range2.from + insert2.length)
      };
    });
  } else if (byLine) {
    changes = state.changeByRange((range2) => {
      let line = text.line(i2++);
      return {
        changes: { from: range2.from, to: range2.to, insert: line.text },
        range: EditorSelection.cursor(range2.from + line.length)
      };
    });
  } else {
    changes = state.replaceSelection(text);
  }
  view.dispatch(changes, {
    userEvent: "input.paste",
    scrollIntoView: true
  });
}
function rangeForClick(view, pos, bias, type) {
  if (type == 1) {
    return EditorSelection.cursor(pos, bias);
  } else if (type == 2) {
    return groupAt(view.state, pos, bias);
  } else {
    let visual = LineView.find(view.docView, pos), line = view.state.doc.lineAt(visual ? visual.posAtEnd : pos);
    let from = visual ? visual.posAtStart : line.from, to = visual ? visual.posAtEnd : line.to;
    if (to < view.state.doc.length && to == line.to)
      to++;
    return EditorSelection.range(from, to);
  }
}
function findPositionSide(view, pos, x2, y) {
  let line = LineView.find(view.docView, pos);
  if (!line)
    return 1;
  let off = pos - line.posAtStart;
  if (off == 0)
    return 1;
  if (off == line.length)
    return -1;
  let before = line.coordsAt(off, -1);
  if (before && inside(x2, y, before))
    return -1;
  let after = line.coordsAt(off, 1);
  if (after && inside(x2, y, after))
    return 1;
  return before && insideY(y, before) ? -1 : 1;
}
function queryPos(view, event) {
  let pos = view.posAtCoords({ x: event.clientX, y: event.clientY }, false);
  return { pos, bias: findPositionSide(view, pos, event.clientX, event.clientY) };
}
function getClickType(event) {
  if (!BadMouseDetail)
    return event.detail;
  let last = lastMouseDown, lastTime = lastMouseDownTime;
  lastMouseDown = event;
  lastMouseDownTime = Date.now();
  return lastMouseDownCount = !last || lastTime > Date.now() - 400 && Math.abs(last.clientX - event.clientX) < 2 && Math.abs(last.clientY - event.clientY) < 2 ? (lastMouseDownCount + 1) % 3 : 1;
}
function basicMouseSelection(view, event) {
  let start = queryPos(view, event), type = getClickType(event);
  let startSel = view.state.selection;
  let last = start, lastEvent = event;
  return {
    update(update) {
      if (update.docChanged) {
        if (start)
          start.pos = update.changes.mapPos(start.pos);
        startSel = startSel.map(update.changes);
        lastEvent = null;
      }
    },
    get(event2, extend2, multiple) {
      let cur;
      if (lastEvent && event2.clientX == lastEvent.clientX && event2.clientY == lastEvent.clientY)
        cur = last;
      else {
        cur = last = queryPos(view, event2);
        lastEvent = event2;
      }
      if (!cur || !start)
        return startSel;
      let range2 = rangeForClick(view, cur.pos, cur.bias, type);
      if (start.pos != cur.pos && !extend2) {
        let startRange = rangeForClick(view, start.pos, start.bias, type);
        let from = Math.min(startRange.from, range2.from), to = Math.max(startRange.to, range2.to);
        range2 = from < range2.from ? EditorSelection.range(from, to) : EditorSelection.range(to, from);
      }
      if (extend2)
        return startSel.replaceRange(startSel.main.extend(range2.from, range2.to));
      else if (multiple)
        return startSel.addRange(range2);
      else
        return EditorSelection.create([range2]);
    }
  };
}
function dropText(view, event, text, direct) {
  if (!text)
    return;
  let dropPos = view.posAtCoords({ x: event.clientX, y: event.clientY }, false);
  event.preventDefault();
  let { mouseSelection } = view.inputState;
  let del = direct && mouseSelection && mouseSelection.dragging && mouseSelection.dragMove ? { from: mouseSelection.dragging.from, to: mouseSelection.dragging.to } : null;
  let ins = { from: dropPos, insert: text };
  let changes = view.state.changes(del ? [del, ins] : ins);
  view.focus();
  view.dispatch({
    changes,
    selection: { anchor: changes.mapPos(dropPos, -1), head: changes.mapPos(dropPos, 1) },
    userEvent: del ? "move.drop" : "input.drop"
  });
}
function captureCopy(view, text) {
  let parent = view.dom.parentNode;
  if (!parent)
    return;
  let target = parent.appendChild(document.createElement("textarea"));
  target.style.cssText = "position: fixed; left: -10000px; top: 10px";
  target.value = text;
  target.focus();
  target.selectionEnd = text.length;
  target.selectionStart = 0;
  setTimeout(() => {
    target.remove();
    view.focus();
  }, 50);
}
function copiedRange(state) {
  let content2 = [], ranges = [], linewise = false;
  for (let range2 of state.selection.ranges)
    if (!range2.empty) {
      content2.push(state.sliceDoc(range2.from, range2.to));
      ranges.push(range2);
    }
  if (!content2.length) {
    let upto = -1;
    for (let { from } of state.selection.ranges) {
      let line = state.doc.lineAt(from);
      if (line.number > upto) {
        content2.push(line.text);
        ranges.push({ from: line.from, to: Math.min(state.doc.length, line.to + 1) });
      }
      upto = line.number;
    }
    linewise = true;
  }
  return { text: content2.join(state.lineBreak), ranges, linewise };
}
function forceClearComposition(view, rapid) {
  if (view.docView.compositionDeco.size) {
    view.inputState.rapidCompositionStart = rapid;
    try {
      view.update([]);
    } finally {
      view.inputState.rapidCompositionStart = false;
    }
  }
}
function mergeGaps(nodes, around) {
  let before, after;
  if (nodes[around] == null && (before = nodes[around - 1]) instanceof HeightMapGap && (after = nodes[around + 1]) instanceof HeightMapGap)
    nodes.splice(around - 1, 3, new HeightMapGap(before.length + 1 + after.length));
}
function heightRelevantDecoChanges(a, b, diff) {
  let comp = new DecorationComparator();
  RangeSet.compare(a, b, diff, comp, 0);
  return comp.changes;
}
function visiblePixelRange(dom, paddingTop) {
  let rect = dom.getBoundingClientRect();
  let left = Math.max(0, rect.left), right = Math.min(innerWidth, rect.right);
  let top2 = Math.max(0, rect.top), bottom = Math.min(innerHeight, rect.bottom);
  let body = dom.ownerDocument.body;
  for (let parent = dom.parentNode; parent && parent != body; ) {
    if (parent.nodeType == 1) {
      let elt = parent;
      let style = window.getComputedStyle(elt);
      if ((elt.scrollHeight > elt.clientHeight || elt.scrollWidth > elt.clientWidth) && style.overflow != "visible") {
        let parentRect = elt.getBoundingClientRect();
        left = Math.max(left, parentRect.left);
        right = Math.min(right, parentRect.right);
        top2 = Math.max(top2, parentRect.top);
        bottom = Math.min(bottom, parentRect.bottom);
      }
      parent = style.position == "absolute" || style.position == "fixed" ? elt.offsetParent : elt.parentNode;
    } else if (parent.nodeType == 11) {
      parent = parent.host;
    } else {
      break;
    }
  }
  return {
    left: left - rect.left,
    right: Math.max(left, right) - rect.left,
    top: top2 - (rect.top + paddingTop),
    bottom: Math.max(top2, bottom) - (rect.top + paddingTop)
  };
}
function lineStructure(from, to, state) {
  let ranges = [], pos = from, total = 0;
  RangeSet.spans(state.facet(decorations), from, to, {
    span() {
    },
    point(from2, to2) {
      if (from2 > pos) {
        ranges.push({ from: pos, to: from2 });
        total += from2 - pos;
      }
      pos = to2;
    }
  }, 20);
  if (pos < to) {
    ranges.push({ from: pos, to });
    total += to - pos;
  }
  return { total, ranges };
}
function findPosition({ total, ranges }, ratio) {
  if (ratio <= 0)
    return ranges[0].from;
  if (ratio >= 1)
    return ranges[ranges.length - 1].to;
  let dist = Math.floor(total * ratio);
  for (let i2 = 0; ; i2++) {
    let { from, to } = ranges[i2], size = to - from;
    if (dist <= size)
      return from + dist;
    dist -= size;
  }
}
function findFraction(structure, pos) {
  let counted = 0;
  for (let { from, to } of structure.ranges) {
    if (pos <= to) {
      counted += pos - from;
      break;
    }
    counted += to - from;
  }
  return counted / structure.total;
}
function cutRange(ranges, from, to) {
  for (let i2 = 0; i2 < ranges.length; i2++) {
    let r2 = ranges[i2];
    if (r2.from < to && r2.to > from) {
      let pieces = [];
      if (r2.from < from)
        pieces.push({ from: r2.from, to: from });
      if (r2.to > to)
        pieces.push({ from: to, to: r2.to });
      ranges.splice(i2, 1, ...pieces);
      i2 += pieces.length - 1;
    }
  }
}
function find(array, f3) {
  for (let val of array)
    if (f3(val))
      return val;
  return void 0;
}
function scaleBlock(block, scaler) {
  if (scaler.scale == 1)
    return block;
  let bTop = scaler.toDOM(block.top), bBottom = scaler.toDOM(block.bottom);
  return new BlockInfo(block.from, block.length, bTop, bBottom - bTop, Array.isArray(block.type) ? block.type.map((b) => scaleBlock(b, scaler)) : block.type);
}
function buildTheme(main, spec, scopes) {
  return new StyleModule(spec, {
    finish(sel) {
      return /&/.test(sel) ? sel.replace(/&\w*/, (m2) => {
        if (m2 == "&")
          return main;
        if (!scopes || !scopes[m2])
          throw new RangeError(`Unsupported selector: ${m2}`);
        return scopes[m2];
      }) : main + " " + sel;
    }
  });
}
function findChild(cView, dom, dir) {
  while (dom) {
    let curView = ContentView.get(dom);
    if (curView && curView.parent == cView)
      return curView;
    let parent = dom.parentNode;
    dom = parent != cView.dom ? parent : dir > 0 ? dom.nextSibling : dom.previousSibling;
  }
  return null;
}
function safariSelectionRangeHack(view) {
  let found = null;
  function read(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    found = event.getTargetRanges()[0];
  }
  view.contentDOM.addEventListener("beforeinput", read, true);
  document.execCommand("indent");
  view.contentDOM.removeEventListener("beforeinput", read, true);
  if (!found)
    return null;
  let anchorNode = found.startContainer, anchorOffset = found.startOffset;
  let focusNode = found.endContainer, focusOffset = found.endOffset;
  let curAnchor = view.docView.domAtPos(view.state.selection.main.anchor);
  if (isEquivalentPosition(curAnchor.node, curAnchor.offset, focusNode, focusOffset))
    [anchorNode, anchorOffset, focusNode, focusOffset] = [focusNode, focusOffset, anchorNode, anchorOffset];
  return { anchorNode, anchorOffset, focusNode, focusOffset };
}
function applyDOMChange(view, start, end, typeOver) {
  let change, newSel;
  let sel = view.state.selection.main;
  if (start > -1) {
    let bounds = view.docView.domBoundsAround(start, end, 0);
    if (!bounds || view.state.readOnly)
      return;
    let { from, to } = bounds;
    let selPoints = view.docView.impreciseHead || view.docView.impreciseAnchor ? [] : selectionPoints(view);
    let reader = new DOMReader(selPoints, view);
    reader.readRange(bounds.startDOM, bounds.endDOM);
    newSel = selectionFromPoints(selPoints, from);
    let preferredPos = sel.from, preferredSide = null;
    if (view.inputState.lastKeyCode === 8 && view.inputState.lastKeyTime > Date.now() - 100 || browser.android && reader.text.length < to - from) {
      preferredPos = sel.to;
      preferredSide = "end";
    }
    let diff = findDiff(view.state.sliceDoc(from, to), reader.text, preferredPos - from, preferredSide);
    if (diff)
      change = {
        from: from + diff.from,
        to: from + diff.toA,
        insert: view.state.toText(reader.text.slice(diff.from, diff.toB))
      };
  } else if (view.hasFocus || !view.state.facet(editable)) {
    let domSel = view.observer.selectionRange;
    let { impreciseHead: iHead, impreciseAnchor: iAnchor } = view.docView;
    let head = iHead && iHead.node == domSel.focusNode && iHead.offset == domSel.focusOffset || !contains(view.contentDOM, domSel.focusNode) ? view.state.selection.main.head : view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
    let anchor = iAnchor && iAnchor.node == domSel.anchorNode && iAnchor.offset == domSel.anchorOffset || !contains(view.contentDOM, domSel.anchorNode) ? view.state.selection.main.anchor : view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset);
    if (head != sel.head || anchor != sel.anchor)
      newSel = EditorSelection.single(anchor, head);
  }
  if (!change && !newSel)
    return;
  if (!change && typeOver && !sel.empty && newSel && newSel.main.empty)
    change = { from: sel.from, to: sel.to, insert: view.state.doc.slice(sel.from, sel.to) };
  else if (change && change.from >= sel.from && change.to <= sel.to && (change.from != sel.from || change.to != sel.to) && sel.to - sel.from - (change.to - change.from) <= 4)
    change = {
      from: sel.from,
      to: sel.to,
      insert: view.state.doc.slice(sel.from, change.from).append(change.insert).append(view.state.doc.slice(change.to, sel.to))
    };
  if (change) {
    let startState = view.state;
    if (browser.ios && view.inputState.flushIOSKey(view))
      return;
    if (browser.android && (change.from == sel.from && change.to == sel.to && change.insert.length == 1 && change.insert.lines == 2 && dispatchKey(view.contentDOM, "Enter", 13) || change.from == sel.from - 1 && change.to == sel.to && change.insert.length == 0 && dispatchKey(view.contentDOM, "Backspace", 8) || change.from == sel.from && change.to == sel.to + 1 && change.insert.length == 0 && dispatchKey(view.contentDOM, "Delete", 46)))
      return;
    let text = change.insert.toString();
    if (view.state.facet(inputHandler).some((h2) => h2(view, change.from, change.to, text)))
      return;
    if (view.inputState.composing >= 0)
      view.inputState.composing++;
    let tr;
    if (change.from >= sel.from && change.to <= sel.to && change.to - change.from >= (sel.to - sel.from) / 3 && (!newSel || newSel.main.empty && newSel.main.from == change.from + change.insert.length)) {
      let before = sel.from < change.from ? startState.sliceDoc(sel.from, change.from) : "";
      let after = sel.to > change.to ? startState.sliceDoc(change.to, sel.to) : "";
      tr = startState.replaceSelection(view.state.toText(before + change.insert.sliceString(0, void 0, view.state.lineBreak) + after));
    } else {
      let changes = startState.changes(change);
      tr = {
        changes,
        selection: newSel && !startState.selection.main.eq(newSel.main) && newSel.main.to <= changes.newLength ? startState.selection.replaceRange(newSel.main) : void 0
      };
    }
    let userEvent = "input.type";
    if (view.composing) {
      userEvent += ".compose";
      if (view.inputState.compositionFirstChange) {
        userEvent += ".start";
        view.inputState.compositionFirstChange = false;
      }
    }
    view.dispatch(tr, { scrollIntoView: true, userEvent });
  } else if (newSel && !newSel.main.eq(sel)) {
    let scrollIntoView2 = false, userEvent = "select";
    if (view.inputState.lastSelectionTime > Date.now() - 50) {
      if (view.inputState.lastSelectionOrigin == "select")
        scrollIntoView2 = true;
      userEvent = view.inputState.lastSelectionOrigin;
    }
    view.dispatch({ selection: newSel, scrollIntoView: scrollIntoView2, userEvent });
  }
}
function findDiff(a, b, preferredPos, preferredSide) {
  let minLen = Math.min(a.length, b.length);
  let from = 0;
  while (from < minLen && a.charCodeAt(from) == b.charCodeAt(from))
    from++;
  if (from == minLen && a.length == b.length)
    return null;
  let toA = a.length, toB = b.length;
  while (toA > 0 && toB > 0 && a.charCodeAt(toA - 1) == b.charCodeAt(toB - 1)) {
    toA--;
    toB--;
  }
  if (preferredSide == "end") {
    let adjust = Math.max(0, from - Math.min(toA, toB));
    preferredPos -= toA + adjust - from;
  }
  if (toA < from && a.length < b.length) {
    let move = preferredPos <= from && preferredPos >= toA ? from - preferredPos : 0;
    from -= move;
    toB = from + (toB - toA);
    toA = from;
  } else if (toB < from) {
    let move = preferredPos <= from && preferredPos >= toB ? from - preferredPos : 0;
    from -= move;
    toA = from + (toA - toB);
    toB = from;
  }
  return { from, toA, toB };
}
function selectionPoints(view) {
  let result = [];
  if (view.root.activeElement != view.contentDOM)
    return result;
  let { anchorNode, anchorOffset, focusNode, focusOffset } = view.observer.selectionRange;
  if (anchorNode) {
    result.push(new DOMPoint(anchorNode, anchorOffset));
    if (focusNode != anchorNode || focusOffset != anchorOffset)
      result.push(new DOMPoint(focusNode, focusOffset));
  }
  return result;
}
function selectionFromPoints(points, base3) {
  if (points.length == 0)
    return null;
  let anchor = points[0].pos, head = points.length == 2 ? points[1].pos : anchor;
  return anchor > -1 && head > -1 ? EditorSelection.single(anchor + base3, head + base3) : null;
}
function ensureTop(given, view) {
  return (given == null ? view.contentDOM.getBoundingClientRect().top : given) + view.viewState.paddingTop;
}
function ensureGlobalHandler() {
  window.addEventListener("resize", () => {
    if (resizeDebounce == -1)
      resizeDebounce = setTimeout(handleResize, 50);
  });
}
function handleResize() {
  resizeDebounce = -1;
  let found = document.querySelectorAll(".cm-content");
  for (let i2 = 0; i2 < found.length; i2++) {
    let docView = ContentView.get(found[i2]);
    if (docView)
      docView.editorView.requestMeasure();
  }
}
function attrsFromFacet(view, facet, base3) {
  for (let sources = view.state.facet(facet), i2 = sources.length - 1; i2 >= 0; i2--) {
    let source = sources[i2], value = typeof source == "function" ? source(view) : source;
    if (value)
      combineAttrs(value, base3);
  }
  return base3;
}
function normalizeKeyName(name2, platform) {
  const parts = name2.split(/-(?!$)/);
  let result = parts[parts.length - 1];
  if (result == "Space")
    result = " ";
  let alt, ctrl, shift2, meta2;
  for (let i2 = 0; i2 < parts.length - 1; ++i2) {
    const mod = parts[i2];
    if (/^(cmd|meta|m)$/i.test(mod))
      meta2 = true;
    else if (/^a(lt)?$/i.test(mod))
      alt = true;
    else if (/^(c|ctrl|control)$/i.test(mod))
      ctrl = true;
    else if (/^s(hift)?$/i.test(mod))
      shift2 = true;
    else if (/^mod$/i.test(mod)) {
      if (platform == "mac")
        meta2 = true;
      else
        ctrl = true;
    } else
      throw new Error("Unrecognized modifier name: " + mod);
  }
  if (alt)
    result = "Alt-" + result;
  if (ctrl)
    result = "Ctrl-" + result;
  if (meta2)
    result = "Meta-" + result;
  if (shift2)
    result = "Shift-" + result;
  return result;
}
function modifiers(name2, event, shift2) {
  if (event.altKey)
    name2 = "Alt-" + name2;
  if (event.ctrlKey)
    name2 = "Ctrl-" + name2;
  if (event.metaKey)
    name2 = "Meta-" + name2;
  if (shift2 !== false && event.shiftKey)
    name2 = "Shift-" + name2;
  return name2;
}
function getKeymap(state) {
  let bindings = state.facet(keymap);
  let map = Keymaps.get(bindings);
  if (!map)
    Keymaps.set(bindings, map = buildKeymap(bindings.reduce((a, b) => a.concat(b), [])));
  return map;
}
function buildKeymap(bindings, platform = currentPlatform) {
  let bound = Object.create(null);
  let isPrefix = Object.create(null);
  let checkPrefix = (name2, is) => {
    let current = isPrefix[name2];
    if (current == null)
      isPrefix[name2] = is;
    else if (current != is)
      throw new Error("Key binding " + name2 + " is used both as a regular binding and as a multi-stroke prefix");
  };
  let add = (scope, key, command, preventDefault) => {
    let scopeObj = bound[scope] || (bound[scope] = Object.create(null));
    let parts = key.split(/ (?!$)/).map((k) => normalizeKeyName(k, platform));
    for (let i2 = 1; i2 < parts.length; i2++) {
      let prefix = parts.slice(0, i2).join(" ");
      checkPrefix(prefix, true);
      if (!scopeObj[prefix])
        scopeObj[prefix] = {
          preventDefault: true,
          commands: [(view) => {
            let ourObj = storedPrefix = { view, prefix, scope };
            setTimeout(() => {
              if (storedPrefix == ourObj)
                storedPrefix = null;
            }, PrefixTimeout);
            return true;
          }]
        };
    }
    let full = parts.join(" ");
    checkPrefix(full, false);
    let binding = scopeObj[full] || (scopeObj[full] = { preventDefault: false, commands: [] });
    binding.commands.push(command);
    if (preventDefault)
      binding.preventDefault = true;
  };
  for (let b of bindings) {
    let name2 = b[platform] || b.key;
    if (!name2)
      continue;
    for (let scope of b.scope ? b.scope.split(" ") : ["editor"]) {
      add(scope, name2, b.run, b.preventDefault);
      if (b.shift)
        add(scope, "Shift-" + name2, b.shift, b.preventDefault);
    }
  }
  return bound;
}
function runHandlers(map, event, view, scope) {
  let name2 = keyName(event), isChar = name2.length == 1 && name2 != " ";
  let prefix = "", fallthrough = false;
  if (storedPrefix && storedPrefix.view == view && storedPrefix.scope == scope) {
    prefix = storedPrefix.prefix + " ";
    if (fallthrough = modifierCodes.indexOf(event.keyCode) < 0)
      storedPrefix = null;
  }
  let runFor = (binding) => {
    if (binding) {
      for (let cmd of binding.commands)
        if (cmd(view))
          return true;
      if (binding.preventDefault)
        fallthrough = true;
    }
    return false;
  };
  let scopeObj = map[scope], baseName;
  if (scopeObj) {
    if (runFor(scopeObj[prefix + modifiers(name2, event, !isChar)]))
      return true;
    if (isChar && (event.shiftKey || event.altKey || event.metaKey) && (baseName = base[event.keyCode]) && baseName != name2) {
      if (runFor(scopeObj[prefix + modifiers(baseName, event, true)]))
        return true;
    } else if (isChar && event.shiftKey) {
      if (runFor(scopeObj[prefix + modifiers(name2, event, true)]))
        return true;
    }
  }
  return fallthrough;
}
var Rect0, DOMSelectionState, preventScrollSupported, scratchRange, DOMPos, noChildren, ContentView, ChildCursor, nav, doc, ie_edge, ie_upto10, ie_11up, ie2, gecko2, chrome2, webkit, safari2, ios, browser, MaxJoinLen, TextView, MarkView, WidgetView, CompositionView, ZeroWidthSpace, WidgetBufferView, WidgetType, BlockType, Decoration, MarkDecoration, LineDecoration, PointDecoration, LineView, BlockWidgetView, ContentBuilder, NullWidget, none2, clickAddsSelectionRange, dragMovesSelection$1, mouseSelectionStyle, exceptionSink, updateListener, inputHandler, scrollTo, centerOn, ScrollTarget, scrollIntoView, editable, PluginFieldProvider, PluginField, nextPluginID, viewPlugin, ViewPlugin, domEventHandlers, PluginInstance, editorAttributes, contentAttributes, decorations, styleModule, ChangedRange, ViewUpdate, Direction, LTR, RTL, LowTypes, ArabicTypes, Brackets, BracketStack, BidiRE, BidiSpan, types2, movedOver, DOMReader, DOMPoint, DocView, BlockGapWidget, CompositionWidget, DecorationComparator$1, InputState, PendingKeys, modifierCodes, MouseSelection, handlers, brokenClipboardAPI, lastTouch, insideY, inside, BadMouseDetail, lastMouseDown, lastMouseDownCount, lastMouseDownTime, lastLinewiseCopy, wrappingWhiteSpace, HeightOracle, MeasuredHeights, BlockInfo, QueryType, Epsilon, HeightMap, HeightMapBlock, HeightMapText, HeightMapGap, HeightMapBranch, relevantWidgetHeight, NodeBuilder, DecorationComparator, LineGap, LineGapWidget, ViewState, Viewport, IdScaler, BigScaler, theme, darkTheme, baseThemeID, baseLightID, baseDarkID, lightDarkIDs, baseTheme, observeOptions, useCharData, DOMObserver, EditorView, MaxBidiLine, resizeDebounce, BadMeasure, CachedOrder, currentPlatform, handleKeyEvents, keymap, Keymaps, storedPrefix, PrefixTimeout, CanHidePrimary, themeSpec, UnicodeRegexpSupport;
var init_dist4 = __esm({
  "node_modules/@codemirror/view/dist/index.js"() {
    init_shims();
    init_dist2();
    init_style_mod();
    init_dist3();
    init_dist();
    init_index_es();
    Rect0 = { left: 0, right: 0, top: 0, bottom: 0 };
    DOMSelectionState = class {
      constructor() {
        this.anchorNode = null;
        this.anchorOffset = 0;
        this.focusNode = null;
        this.focusOffset = 0;
      }
      eq(domSel) {
        return this.anchorNode == domSel.anchorNode && this.anchorOffset == domSel.anchorOffset && this.focusNode == domSel.focusNode && this.focusOffset == domSel.focusOffset;
      }
      setRange(range2) {
        this.set(range2.anchorNode, range2.anchorOffset, range2.focusNode, range2.focusOffset);
      }
      set(anchorNode, anchorOffset, focusNode, focusOffset) {
        this.anchorNode = anchorNode;
        this.anchorOffset = anchorOffset;
        this.focusNode = focusNode;
        this.focusOffset = focusOffset;
      }
    };
    preventScrollSupported = null;
    DOMPos = class {
      constructor(node, offset, precise = true) {
        this.node = node;
        this.offset = offset;
        this.precise = precise;
      }
      static before(dom, precise) {
        return new DOMPos(dom.parentNode, domIndex(dom), precise);
      }
      static after(dom, precise) {
        return new DOMPos(dom.parentNode, domIndex(dom) + 1, precise);
      }
    };
    noChildren = [];
    ContentView = class {
      constructor() {
        this.parent = null;
        this.dom = null;
        this.dirty = 2;
      }
      get editorView() {
        if (!this.parent)
          throw new Error("Accessing view in orphan content view");
        return this.parent.editorView;
      }
      get overrideDOMText() {
        return null;
      }
      get posAtStart() {
        return this.parent ? this.parent.posBefore(this) : 0;
      }
      get posAtEnd() {
        return this.posAtStart + this.length;
      }
      posBefore(view) {
        let pos = this.posAtStart;
        for (let child of this.children) {
          if (child == view)
            return pos;
          pos += child.length + child.breakAfter;
        }
        throw new RangeError("Invalid child in posBefore");
      }
      posAfter(view) {
        return this.posBefore(view) + view.length;
      }
      coordsAt(_pos, _side) {
        return null;
      }
      sync(track) {
        if (this.dirty & 2) {
          let parent = this.dom;
          let pos = parent.firstChild;
          for (let child of this.children) {
            if (child.dirty) {
              if (!child.dom && pos) {
                let contentView = ContentView.get(pos);
                if (!contentView || !contentView.parent && contentView.constructor == child.constructor)
                  child.reuseDOM(pos);
              }
              child.sync(track);
              child.dirty = 0;
            }
            if (track && !track.written && track.node == parent && pos != child.dom)
              track.written = true;
            if (child.dom.parentNode == parent) {
              while (pos && pos != child.dom)
                pos = rm(pos);
              pos = child.dom.nextSibling;
            } else {
              parent.insertBefore(child.dom, pos);
            }
          }
          if (pos && track && track.node == parent)
            track.written = true;
          while (pos)
            pos = rm(pos);
        } else if (this.dirty & 1) {
          for (let child of this.children)
            if (child.dirty) {
              child.sync(track);
              child.dirty = 0;
            }
        }
      }
      reuseDOM(_dom) {
      }
      localPosFromDOM(node, offset) {
        let after;
        if (node == this.dom) {
          after = this.dom.childNodes[offset];
        } else {
          let bias = maxOffset(node) == 0 ? 0 : offset == 0 ? -1 : 1;
          for (; ; ) {
            let parent = node.parentNode;
            if (parent == this.dom)
              break;
            if (bias == 0 && parent.firstChild != parent.lastChild) {
              if (node == parent.firstChild)
                bias = -1;
              else
                bias = 1;
            }
            node = parent;
          }
          if (bias < 0)
            after = node;
          else
            after = node.nextSibling;
        }
        if (after == this.dom.firstChild)
          return 0;
        while (after && !ContentView.get(after))
          after = after.nextSibling;
        if (!after)
          return this.length;
        for (let i2 = 0, pos = 0; ; i2++) {
          let child = this.children[i2];
          if (child.dom == after)
            return pos;
          pos += child.length + child.breakAfter;
        }
      }
      domBoundsAround(from, to, offset = 0) {
        let fromI = -1, fromStart = -1, toI = -1, toEnd = -1;
        for (let i2 = 0, pos = offset, prevEnd = offset; i2 < this.children.length; i2++) {
          let child = this.children[i2], end = pos + child.length;
          if (pos < from && end > to)
            return child.domBoundsAround(from, to, pos);
          if (end >= from && fromI == -1) {
            fromI = i2;
            fromStart = pos;
          }
          if (pos > to && child.dom.parentNode == this.dom) {
            toI = i2;
            toEnd = prevEnd;
            break;
          }
          prevEnd = end;
          pos = end + child.breakAfter;
        }
        return {
          from: fromStart,
          to: toEnd < 0 ? offset + this.length : toEnd,
          startDOM: (fromI ? this.children[fromI - 1].dom.nextSibling : null) || this.dom.firstChild,
          endDOM: toI < this.children.length && toI >= 0 ? this.children[toI].dom : null
        };
      }
      markDirty(andParent = false) {
        this.dirty |= 2;
        this.markParentsDirty(andParent);
      }
      markParentsDirty(childList) {
        for (let parent = this.parent; parent; parent = parent.parent) {
          if (childList)
            parent.dirty |= 2;
          if (parent.dirty & 1)
            return;
          parent.dirty |= 1;
          childList = false;
        }
      }
      setParent(parent) {
        if (this.parent != parent) {
          this.parent = parent;
          if (this.dirty)
            this.markParentsDirty(true);
        }
      }
      setDOM(dom) {
        if (this.dom)
          this.dom.cmView = null;
        this.dom = dom;
        dom.cmView = this;
      }
      get rootView() {
        for (let v = this; ; ) {
          let parent = v.parent;
          if (!parent)
            return v;
          v = parent;
        }
      }
      replaceChildren(from, to, children = noChildren) {
        this.markDirty();
        for (let i2 = from; i2 < to; i2++) {
          let child = this.children[i2];
          if (child.parent == this)
            child.destroy();
        }
        this.children.splice(from, to - from, ...children);
        for (let i2 = 0; i2 < children.length; i2++)
          children[i2].setParent(this);
      }
      ignoreMutation(_rec) {
        return false;
      }
      ignoreEvent(_event) {
        return false;
      }
      childCursor(pos = this.length) {
        return new ChildCursor(this.children, pos, this.children.length);
      }
      childPos(pos, bias = 1) {
        return this.childCursor().findPos(pos, bias);
      }
      toString() {
        let name2 = this.constructor.name.replace("View", "");
        return name2 + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (name2 == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "");
      }
      static get(node) {
        return node.cmView;
      }
      get isEditable() {
        return true;
      }
      merge(from, to, source, hasStart, openStart, openEnd) {
        return false;
      }
      become(other) {
        return false;
      }
      getSide() {
        return 0;
      }
      destroy() {
        this.parent = null;
      }
    };
    ContentView.prototype.breakAfter = 0;
    ChildCursor = class {
      constructor(children, pos, i2) {
        this.children = children;
        this.pos = pos;
        this.i = i2;
        this.off = 0;
      }
      findPos(pos, bias = 1) {
        for (; ; ) {
          if (pos > this.pos || pos == this.pos && (bias > 0 || this.i == 0 || this.children[this.i - 1].breakAfter)) {
            this.off = pos - this.pos;
            return this;
          }
          let next = this.children[--this.i];
          this.pos -= next.length + next.breakAfter;
        }
      }
    };
    [nav, doc] = typeof navigator != "undefined" ? [navigator, document] : [{ userAgent: "", vendor: "", platform: "" }, { documentElement: { style: {} } }];
    ie_edge = /* @__PURE__ */ /Edge\/(\d+)/.exec(nav.userAgent);
    ie_upto10 = /* @__PURE__ */ /MSIE \d/.test(nav.userAgent);
    ie_11up = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(nav.userAgent);
    ie2 = !!(ie_upto10 || ie_11up || ie_edge);
    gecko2 = !ie2 && /* @__PURE__ */ /gecko\/(\d+)/i.test(nav.userAgent);
    chrome2 = !ie2 && /* @__PURE__ */ /Chrome\/(\d+)/.exec(nav.userAgent);
    webkit = "webkitFontSmoothing" in doc.documentElement.style;
    safari2 = !ie2 && /* @__PURE__ */ /Apple Computer/.test(nav.vendor);
    ios = safari2 && (/* @__PURE__ */ /Mobile\/\w+/.test(nav.userAgent) || nav.maxTouchPoints > 2);
    browser = {
      mac: ios || /* @__PURE__ */ /Mac/.test(nav.platform),
      windows: /* @__PURE__ */ /Win/.test(nav.platform),
      linux: /* @__PURE__ */ /Linux|X11/.test(nav.platform),
      ie: ie2,
      ie_version: ie_upto10 ? doc.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : 0,
      gecko: gecko2,
      gecko_version: gecko2 ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(nav.userAgent) || [0, 0])[1] : 0,
      chrome: !!chrome2,
      chrome_version: chrome2 ? +chrome2[1] : 0,
      ios,
      android: /* @__PURE__ */ /Android\b/.test(nav.userAgent),
      webkit,
      safari: safari2,
      webkit_version: webkit ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0,
      tabSize: doc.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
    };
    MaxJoinLen = 256;
    TextView = class extends ContentView {
      constructor(text) {
        super();
        this.text = text;
      }
      get length() {
        return this.text.length;
      }
      createDOM(textDOM) {
        this.setDOM(textDOM || document.createTextNode(this.text));
      }
      sync(track) {
        if (!this.dom)
          this.createDOM();
        if (this.dom.nodeValue != this.text) {
          if (track && track.node == this.dom)
            track.written = true;
          this.dom.nodeValue = this.text;
        }
      }
      reuseDOM(dom) {
        if (dom.nodeType == 3)
          this.createDOM(dom);
      }
      merge(from, to, source) {
        if (source && (!(source instanceof TextView) || this.length - (to - from) + source.length > MaxJoinLen))
          return false;
        this.text = this.text.slice(0, from) + (source ? source.text : "") + this.text.slice(to);
        this.markDirty();
        return true;
      }
      split(from) {
        let result = new TextView(this.text.slice(from));
        this.text = this.text.slice(0, from);
        this.markDirty();
        return result;
      }
      localPosFromDOM(node, offset) {
        return node == this.dom ? offset : offset ? this.text.length : 0;
      }
      domAtPos(pos) {
        return new DOMPos(this.dom, pos);
      }
      domBoundsAround(_from, _to, offset) {
        return { from: offset, to: offset + this.length, startDOM: this.dom, endDOM: this.dom.nextSibling };
      }
      coordsAt(pos, side) {
        return textCoords(this.dom, pos, side);
      }
    };
    MarkView = class extends ContentView {
      constructor(mark, children = [], length = 0) {
        super();
        this.mark = mark;
        this.children = children;
        this.length = length;
        for (let ch of children)
          ch.setParent(this);
      }
      setAttrs(dom) {
        clearAttributes(dom);
        if (this.mark.class)
          dom.className = this.mark.class;
        if (this.mark.attrs)
          for (let name2 in this.mark.attrs)
            dom.setAttribute(name2, this.mark.attrs[name2]);
        return dom;
      }
      reuseDOM(node) {
        if (node.nodeName == this.mark.tagName.toUpperCase()) {
          this.setDOM(node);
          this.dirty |= 4 | 2;
        }
      }
      sync(track) {
        if (!this.dom)
          this.setDOM(this.setAttrs(document.createElement(this.mark.tagName)));
        else if (this.dirty & 4)
          this.setAttrs(this.dom);
        super.sync(track);
      }
      merge(from, to, source, _hasStart, openStart, openEnd) {
        if (source && (!(source instanceof MarkView && source.mark.eq(this.mark)) || from && openStart <= 0 || to < this.length && openEnd <= 0))
          return false;
        mergeChildrenInto(this, from, to, source ? source.children : [], openStart - 1, openEnd - 1);
        this.markDirty();
        return true;
      }
      split(from) {
        let result = [], off = 0, detachFrom = -1, i2 = 0;
        for (let elt of this.children) {
          let end = off + elt.length;
          if (end > from)
            result.push(off < from ? elt.split(from - off) : elt);
          if (detachFrom < 0 && off >= from)
            detachFrom = i2;
          off = end;
          i2++;
        }
        let length = this.length - from;
        this.length = from;
        if (detachFrom > -1) {
          this.children.length = detachFrom;
          this.markDirty();
        }
        return new MarkView(this.mark, result, length);
      }
      domAtPos(pos) {
        return inlineDOMAtPos(this.dom, this.children, pos);
      }
      coordsAt(pos, side) {
        return coordsInChildren(this, pos, side);
      }
    };
    WidgetView = class extends ContentView {
      constructor(widget, length, side) {
        super();
        this.widget = widget;
        this.length = length;
        this.side = side;
      }
      static create(widget, length, side) {
        return new (widget.customView || WidgetView)(widget, length, side);
      }
      split(from) {
        let result = WidgetView.create(this.widget, this.length - from, this.side);
        this.length -= from;
        return result;
      }
      sync() {
        if (!this.dom || !this.widget.updateDOM(this.dom)) {
          this.setDOM(this.widget.toDOM(this.editorView));
          this.dom.contentEditable = "false";
        }
      }
      getSide() {
        return this.side;
      }
      merge(from, to, source, hasStart, openStart, openEnd) {
        if (source && (!(source instanceof WidgetView) || !this.widget.compare(source.widget) || from > 0 && openStart <= 0 || to < this.length && openEnd <= 0))
          return false;
        this.length = from + (source ? source.length : 0) + (this.length - to);
        return true;
      }
      become(other) {
        if (other.length == this.length && other instanceof WidgetView && other.side == this.side) {
          if (this.widget.constructor == other.widget.constructor) {
            if (!this.widget.eq(other.widget))
              this.markDirty(true);
            this.widget = other.widget;
            return true;
          }
        }
        return false;
      }
      ignoreMutation() {
        return true;
      }
      ignoreEvent(event) {
        return this.widget.ignoreEvent(event);
      }
      get overrideDOMText() {
        if (this.length == 0)
          return Text.empty;
        let top2 = this;
        while (top2.parent)
          top2 = top2.parent;
        let view = top2.editorView, text = view && view.state.doc, start = this.posAtStart;
        return text ? text.slice(start, start + this.length) : Text.empty;
      }
      domAtPos(pos) {
        return pos == 0 ? DOMPos.before(this.dom) : DOMPos.after(this.dom, pos == this.length);
      }
      domBoundsAround() {
        return null;
      }
      coordsAt(pos, side) {
        let rects = this.dom.getClientRects(), rect = null;
        if (!rects.length)
          return Rect0;
        for (let i2 = pos > 0 ? rects.length - 1 : 0; ; i2 += pos > 0 ? -1 : 1) {
          rect = rects[i2];
          if (pos > 0 ? i2 == 0 : i2 == rects.length - 1 || rect.top < rect.bottom)
            break;
        }
        return pos == 0 && side > 0 || pos == this.length && side <= 0 ? rect : flattenRect(rect, pos == 0);
      }
      get isEditable() {
        return false;
      }
      destroy() {
        super.destroy();
        if (this.dom)
          this.widget.destroy(this.dom);
      }
    };
    CompositionView = class extends WidgetView {
      domAtPos(pos) {
        return new DOMPos(this.widget.text, pos);
      }
      sync() {
        this.setDOM(this.widget.toDOM());
      }
      localPosFromDOM(node, offset) {
        return !offset ? 0 : node.nodeType == 3 ? Math.min(offset, this.length) : this.length;
      }
      ignoreMutation() {
        return false;
      }
      get overrideDOMText() {
        return null;
      }
      coordsAt(pos, side) {
        return textCoords(this.widget.text, pos, side);
      }
      get isEditable() {
        return true;
      }
    };
    ZeroWidthSpace = browser.android ? "\u200B\u200B" : "\u200B";
    WidgetBufferView = class extends ContentView {
      constructor(side) {
        super();
        this.side = side;
      }
      get length() {
        return 0;
      }
      merge() {
        return false;
      }
      become(other) {
        return other instanceof WidgetBufferView && other.side == this.side;
      }
      split() {
        return new WidgetBufferView(this.side);
      }
      sync() {
        if (!this.dom)
          this.setDOM(document.createTextNode(ZeroWidthSpace));
        else if (this.dirty && this.dom.nodeValue != ZeroWidthSpace)
          this.dom.nodeValue = ZeroWidthSpace;
      }
      getSide() {
        return this.side;
      }
      domAtPos(pos) {
        return DOMPos.before(this.dom);
      }
      localPosFromDOM() {
        return 0;
      }
      domBoundsAround() {
        return null;
      }
      coordsAt(pos) {
        let rects = clientRectsFor(this.dom);
        return rects[rects.length - 1] || null;
      }
      get overrideDOMText() {
        return Text.of([this.dom.nodeValue.replace(/\u200b/g, "")]);
      }
    };
    TextView.prototype.children = WidgetView.prototype.children = WidgetBufferView.prototype.children = noChildren;
    WidgetType = class {
      eq(_widget) {
        return false;
      }
      updateDOM(_dom) {
        return false;
      }
      compare(other) {
        return this == other || this.constructor == other.constructor && this.eq(other);
      }
      get estimatedHeight() {
        return -1;
      }
      ignoreEvent(_event) {
        return true;
      }
      get customView() {
        return null;
      }
      destroy(_dom) {
      }
    };
    BlockType = /* @__PURE__ */ function(BlockType2) {
      BlockType2[BlockType2["Text"] = 0] = "Text";
      BlockType2[BlockType2["WidgetBefore"] = 1] = "WidgetBefore";
      BlockType2[BlockType2["WidgetAfter"] = 2] = "WidgetAfter";
      BlockType2[BlockType2["WidgetRange"] = 3] = "WidgetRange";
      return BlockType2;
    }(BlockType || (BlockType = {}));
    Decoration = class extends RangeValue {
      constructor(startSide, endSide, widget, spec) {
        super();
        this.startSide = startSide;
        this.endSide = endSide;
        this.widget = widget;
        this.spec = spec;
      }
      get heightRelevant() {
        return false;
      }
      static mark(spec) {
        return new MarkDecoration(spec);
      }
      static widget(spec) {
        let side = spec.side || 0, block = !!spec.block;
        side += block ? side > 0 ? 3e8 : -4e8 : side > 0 ? 1e8 : -1e8;
        return new PointDecoration(spec, side, side, block, spec.widget || null, false);
      }
      static replace(spec) {
        let block = !!spec.block;
        let { start, end } = getInclusive(spec, block);
        let startSide = block ? start ? -3e8 : -1 : 4e8;
        let endSide = block ? end ? 2e8 : 1 : -5e8;
        return new PointDecoration(spec, startSide, endSide, block, spec.widget || null, true);
      }
      static line(spec) {
        return new LineDecoration(spec);
      }
      static set(of, sort = false) {
        return RangeSet.of(of, sort);
      }
      hasHeight() {
        return this.widget ? this.widget.estimatedHeight > -1 : false;
      }
    };
    Decoration.none = RangeSet.empty;
    MarkDecoration = class extends Decoration {
      constructor(spec) {
        let { start, end } = getInclusive(spec);
        super(start ? -1 : 4e8, end ? 1 : -5e8, null, spec);
        this.tagName = spec.tagName || "span";
        this.class = spec.class || "";
        this.attrs = spec.attributes || null;
      }
      eq(other) {
        return this == other || other instanceof MarkDecoration && this.tagName == other.tagName && this.class == other.class && attrsEq(this.attrs, other.attrs);
      }
      range(from, to = from) {
        if (from >= to)
          throw new RangeError("Mark decorations may not be empty");
        return super.range(from, to);
      }
    };
    MarkDecoration.prototype.point = false;
    LineDecoration = class extends Decoration {
      constructor(spec) {
        super(-2e8, -2e8, null, spec);
      }
      eq(other) {
        return other instanceof LineDecoration && attrsEq(this.spec.attributes, other.spec.attributes);
      }
      range(from, to = from) {
        if (to != from)
          throw new RangeError("Line decoration ranges must be zero-length");
        return super.range(from, to);
      }
    };
    LineDecoration.prototype.mapMode = MapMode.TrackBefore;
    LineDecoration.prototype.point = true;
    PointDecoration = class extends Decoration {
      constructor(spec, startSide, endSide, block, widget, isReplace) {
        super(startSide, endSide, widget, spec);
        this.block = block;
        this.isReplace = isReplace;
        this.mapMode = !block ? MapMode.TrackDel : startSide <= 0 ? MapMode.TrackBefore : MapMode.TrackAfter;
      }
      get type() {
        return this.startSide < this.endSide ? BlockType.WidgetRange : this.startSide <= 0 ? BlockType.WidgetBefore : BlockType.WidgetAfter;
      }
      get heightRelevant() {
        return this.block || !!this.widget && this.widget.estimatedHeight >= 5;
      }
      eq(other) {
        return other instanceof PointDecoration && widgetsEq(this.widget, other.widget) && this.block == other.block && this.startSide == other.startSide && this.endSide == other.endSide;
      }
      range(from, to = from) {
        if (this.isReplace && (from > to || from == to && this.startSide > 0 && this.endSide <= 0))
          throw new RangeError("Invalid range for replacement decoration");
        if (!this.isReplace && to != from)
          throw new RangeError("Widget decorations can only have zero-length ranges");
        return super.range(from, to);
      }
    };
    PointDecoration.prototype.point = true;
    LineView = class extends ContentView {
      constructor() {
        super(...arguments);
        this.children = [];
        this.length = 0;
        this.prevAttrs = void 0;
        this.attrs = null;
        this.breakAfter = 0;
      }
      merge(from, to, source, hasStart, openStart, openEnd) {
        if (source) {
          if (!(source instanceof LineView))
            return false;
          if (!this.dom)
            source.transferDOM(this);
        }
        if (hasStart)
          this.setDeco(source ? source.attrs : null);
        mergeChildrenInto(this, from, to, source ? source.children : [], openStart, openEnd);
        return true;
      }
      split(at) {
        let end = new LineView();
        end.breakAfter = this.breakAfter;
        if (this.length == 0)
          return end;
        let { i: i2, off } = this.childPos(at);
        if (off) {
          end.append(this.children[i2].split(off), 0);
          this.children[i2].merge(off, this.children[i2].length, null, false, 0, 0);
          i2++;
        }
        for (let j = i2; j < this.children.length; j++)
          end.append(this.children[j], 0);
        while (i2 > 0 && this.children[i2 - 1].length == 0)
          this.children[--i2].destroy();
        this.children.length = i2;
        this.markDirty();
        this.length = at;
        return end;
      }
      transferDOM(other) {
        if (!this.dom)
          return;
        other.setDOM(this.dom);
        other.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs;
        this.prevAttrs = void 0;
        this.dom = null;
      }
      setDeco(attrs) {
        if (!attrsEq(this.attrs, attrs)) {
          if (this.dom) {
            this.prevAttrs = this.attrs;
            this.markDirty();
          }
          this.attrs = attrs;
        }
      }
      append(child, openStart) {
        joinInlineInto(this, child, openStart);
      }
      addLineDeco(deco) {
        let attrs = deco.spec.attributes, cls = deco.spec.class;
        if (attrs)
          this.attrs = combineAttrs(attrs, this.attrs || {});
        if (cls)
          this.attrs = combineAttrs(attrs, { class: cls });
      }
      domAtPos(pos) {
        return inlineDOMAtPos(this.dom, this.children, pos);
      }
      reuseDOM(node) {
        if (node.nodeName == "DIV") {
          this.setDOM(node);
          this.dirty |= 4 | 2;
        }
      }
      sync(track) {
        var _a;
        if (!this.dom) {
          this.setDOM(document.createElement("div"));
          this.dom.className = "cm-line";
          this.prevAttrs = this.attrs ? null : void 0;
        } else if (this.dirty & 4) {
          clearAttributes(this.dom);
          this.dom.className = "cm-line";
          this.prevAttrs = this.attrs ? null : void 0;
        }
        if (this.prevAttrs !== void 0) {
          updateAttrs(this.dom, this.prevAttrs, this.attrs);
          this.dom.classList.add("cm-line");
          this.prevAttrs = void 0;
        }
        super.sync(track);
        let last = this.dom.lastChild;
        while (last && ContentView.get(last) instanceof MarkView)
          last = last.lastChild;
        if (!last || last.nodeName != "BR" && ((_a = ContentView.get(last)) === null || _a === void 0 ? void 0 : _a.isEditable) == false && (!browser.ios || !this.children.some((ch) => ch instanceof TextView))) {
          let hack = document.createElement("BR");
          hack.cmIgnore = true;
          this.dom.appendChild(hack);
        }
      }
      measureTextSize() {
        if (this.children.length == 0 || this.length > 20)
          return null;
        let totalWidth = 0;
        for (let child of this.children) {
          if (!(child instanceof TextView))
            return null;
          let rects = clientRectsFor(child.dom);
          if (rects.length != 1)
            return null;
          totalWidth += rects[0].width;
        }
        return {
          lineHeight: this.dom.getBoundingClientRect().height,
          charWidth: totalWidth / this.length
        };
      }
      coordsAt(pos, side) {
        return coordsInChildren(this, pos, side);
      }
      become(_other) {
        return false;
      }
      get type() {
        return BlockType.Text;
      }
      static find(docView, pos) {
        for (let i2 = 0, off = 0; i2 < docView.children.length; i2++) {
          let block = docView.children[i2], end = off + block.length;
          if (end >= pos) {
            if (block instanceof LineView)
              return block;
            if (end > pos)
              break;
          }
          off = end + block.breakAfter;
        }
        return null;
      }
    };
    BlockWidgetView = class extends ContentView {
      constructor(widget, length, type) {
        super();
        this.widget = widget;
        this.length = length;
        this.type = type;
        this.breakAfter = 0;
      }
      merge(from, to, source, _takeDeco, openStart, openEnd) {
        if (source && (!(source instanceof BlockWidgetView) || !this.widget.compare(source.widget) || from > 0 && openStart <= 0 || to < this.length && openEnd <= 0))
          return false;
        this.length = from + (source ? source.length : 0) + (this.length - to);
        return true;
      }
      domAtPos(pos) {
        return pos == 0 ? DOMPos.before(this.dom) : DOMPos.after(this.dom, pos == this.length);
      }
      split(at) {
        let len = this.length - at;
        this.length = at;
        let end = new BlockWidgetView(this.widget, len, this.type);
        end.breakAfter = this.breakAfter;
        return end;
      }
      get children() {
        return noChildren;
      }
      sync() {
        if (!this.dom || !this.widget.updateDOM(this.dom)) {
          this.setDOM(this.widget.toDOM(this.editorView));
          this.dom.contentEditable = "false";
        }
      }
      get overrideDOMText() {
        return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : Text.empty;
      }
      domBoundsAround() {
        return null;
      }
      become(other) {
        if (other instanceof BlockWidgetView && other.type == this.type && other.widget.constructor == this.widget.constructor) {
          if (!other.widget.eq(this.widget))
            this.markDirty(true);
          this.widget = other.widget;
          this.length = other.length;
          this.breakAfter = other.breakAfter;
          return true;
        }
        return false;
      }
      ignoreMutation() {
        return true;
      }
      ignoreEvent(event) {
        return this.widget.ignoreEvent(event);
      }
      destroy() {
        super.destroy();
        if (this.dom)
          this.widget.destroy(this.dom);
      }
    };
    ContentBuilder = class {
      constructor(doc2, pos, end, disallowBlockEffectsBelow) {
        this.doc = doc2;
        this.pos = pos;
        this.end = end;
        this.disallowBlockEffectsBelow = disallowBlockEffectsBelow;
        this.content = [];
        this.curLine = null;
        this.breakAtStart = 0;
        this.pendingBuffer = 0;
        this.atCursorPos = true;
        this.openStart = -1;
        this.openEnd = -1;
        this.text = "";
        this.textOff = 0;
        this.cursor = doc2.iter();
        this.skip = pos;
      }
      posCovered() {
        if (this.content.length == 0)
          return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
        let last = this.content[this.content.length - 1];
        return !last.breakAfter && !(last instanceof BlockWidgetView && last.type == BlockType.WidgetBefore);
      }
      getLine() {
        if (!this.curLine) {
          this.content.push(this.curLine = new LineView());
          this.atCursorPos = true;
        }
        return this.curLine;
      }
      flushBuffer(active) {
        if (this.pendingBuffer) {
          this.curLine.append(wrapMarks(new WidgetBufferView(-1), active), active.length);
          this.pendingBuffer = 0;
        }
      }
      addBlockWidget(view) {
        this.flushBuffer([]);
        this.curLine = null;
        this.content.push(view);
      }
      finish(openEnd) {
        if (!openEnd)
          this.flushBuffer([]);
        else
          this.pendingBuffer = 0;
        if (!this.posCovered())
          this.getLine();
      }
      buildText(length, active, openStart) {
        while (length > 0) {
          if (this.textOff == this.text.length) {
            let { value, lineBreak, done } = this.cursor.next(this.skip);
            this.skip = 0;
            if (done)
              throw new Error("Ran out of text content when drawing inline views");
            if (lineBreak) {
              if (!this.posCovered())
                this.getLine();
              if (this.content.length)
                this.content[this.content.length - 1].breakAfter = 1;
              else
                this.breakAtStart = 1;
              this.flushBuffer([]);
              this.curLine = null;
              length--;
              continue;
            } else {
              this.text = value;
              this.textOff = 0;
            }
          }
          let take = Math.min(this.text.length - this.textOff, length, 512);
          this.flushBuffer(active);
          this.getLine().append(wrapMarks(new TextView(this.text.slice(this.textOff, this.textOff + take)), active), openStart);
          this.atCursorPos = true;
          this.textOff += take;
          length -= take;
          openStart = 0;
        }
      }
      span(from, to, active, openStart) {
        this.buildText(to - from, active, openStart);
        this.pos = to;
        if (this.openStart < 0)
          this.openStart = openStart;
      }
      point(from, to, deco, active, openStart) {
        let len = to - from;
        if (deco instanceof PointDecoration) {
          if (deco.block) {
            let { type } = deco;
            if (type == BlockType.WidgetAfter && !this.posCovered())
              this.getLine();
            this.addBlockWidget(new BlockWidgetView(deco.widget || new NullWidget("div"), len, type));
          } else {
            let view = WidgetView.create(deco.widget || new NullWidget("span"), len, deco.startSide);
            let cursorBefore = this.atCursorPos && !view.isEditable && openStart <= active.length && (from < to || deco.startSide > 0);
            let cursorAfter = !view.isEditable && (from < to || deco.startSide <= 0);
            let line = this.getLine();
            if (this.pendingBuffer == 2 && !cursorBefore)
              this.pendingBuffer = 0;
            this.flushBuffer(active);
            if (cursorBefore) {
              line.append(wrapMarks(new WidgetBufferView(1), active), openStart);
              openStart = active.length + Math.max(0, openStart - active.length);
            }
            line.append(wrapMarks(view, active), openStart);
            this.atCursorPos = cursorAfter;
            this.pendingBuffer = !cursorAfter ? 0 : from < to ? 1 : 2;
          }
        } else if (this.doc.lineAt(this.pos).from == this.pos) {
          this.getLine().addLineDeco(deco);
        }
        if (len) {
          if (this.textOff + len <= this.text.length) {
            this.textOff += len;
          } else {
            this.skip += len - (this.text.length - this.textOff);
            this.text = "";
            this.textOff = 0;
          }
          this.pos = to;
        }
        if (this.openStart < 0)
          this.openStart = openStart;
      }
      filterPoint(from, to, value, index2) {
        if (index2 >= this.disallowBlockEffectsBelow || !(value instanceof PointDecoration))
          return true;
        if (value.block)
          throw new RangeError("Block decorations may not be specified via plugins");
        return to <= this.doc.lineAt(this.pos).to;
      }
      static build(text, from, to, decorations2, pluginDecorationLength) {
        let builder = new ContentBuilder(text, from, to, pluginDecorationLength);
        builder.openEnd = RangeSet.spans(decorations2, from, to, builder);
        if (builder.openStart < 0)
          builder.openStart = builder.openEnd;
        builder.finish(builder.openEnd);
        return builder;
      }
    };
    NullWidget = class extends WidgetType {
      constructor(tag) {
        super();
        this.tag = tag;
      }
      eq(other) {
        return other.tag == this.tag;
      }
      toDOM() {
        return document.createElement(this.tag);
      }
      updateDOM(elt) {
        return elt.nodeName.toLowerCase() == this.tag;
      }
    };
    none2 = [];
    clickAddsSelectionRange = /* @__PURE__ */ Facet.define();
    dragMovesSelection$1 = /* @__PURE__ */ Facet.define();
    mouseSelectionStyle = /* @__PURE__ */ Facet.define();
    exceptionSink = /* @__PURE__ */ Facet.define();
    updateListener = /* @__PURE__ */ Facet.define();
    inputHandler = /* @__PURE__ */ Facet.define();
    scrollTo = /* @__PURE__ */ StateEffect.define({
      map: (range2, changes) => range2.map(changes)
    });
    centerOn = /* @__PURE__ */ StateEffect.define({
      map: (range2, changes) => range2.map(changes)
    });
    ScrollTarget = class {
      constructor(range2, y = "nearest", x2 = "nearest", yMargin = 5, xMargin = 5) {
        this.range = range2;
        this.y = y;
        this.x = x2;
        this.yMargin = yMargin;
        this.xMargin = xMargin;
      }
      map(changes) {
        return changes.empty ? this : new ScrollTarget(this.range.map(changes), this.y, this.x, this.yMargin, this.xMargin);
      }
    };
    scrollIntoView = /* @__PURE__ */ StateEffect.define({ map: (t3, ch) => t3.map(ch) });
    editable = /* @__PURE__ */ Facet.define({ combine: (values) => values.length ? values[0] : true });
    PluginFieldProvider = class {
      constructor(field, get) {
        this.field = field;
        this.get = get;
      }
    };
    PluginField = class {
      from(get) {
        return new PluginFieldProvider(this, get);
      }
      static define() {
        return new PluginField();
      }
    };
    PluginField.decorations = /* @__PURE__ */ PluginField.define();
    PluginField.atomicRanges = /* @__PURE__ */ PluginField.define();
    PluginField.scrollMargins = /* @__PURE__ */ PluginField.define();
    nextPluginID = 0;
    viewPlugin = /* @__PURE__ */ Facet.define();
    ViewPlugin = class {
      constructor(id2, create, fields) {
        this.id = id2;
        this.create = create;
        this.fields = fields;
        this.extension = viewPlugin.of(this);
      }
      static define(create, spec) {
        let { eventHandlers, provide, decorations: decorations2 } = spec || {};
        let fields = [];
        if (provide)
          for (let provider of Array.isArray(provide) ? provide : [provide])
            fields.push(provider);
        if (eventHandlers)
          fields.push(domEventHandlers.from((value) => ({ plugin: value, handlers: eventHandlers })));
        if (decorations2)
          fields.push(PluginField.decorations.from(decorations2));
        return new ViewPlugin(nextPluginID++, create, fields);
      }
      static fromClass(cls, spec) {
        return ViewPlugin.define((view) => new cls(view), spec);
      }
    };
    domEventHandlers = /* @__PURE__ */ PluginField.define();
    PluginInstance = class {
      constructor(spec) {
        this.spec = spec;
        this.mustUpdate = null;
        this.value = null;
      }
      takeField(type, target) {
        if (this.spec) {
          for (let { field, get } of this.spec.fields)
            if (field == type)
              target.push(get(this.value));
        }
      }
      update(view) {
        if (!this.value) {
          if (this.spec) {
            try {
              this.value = this.spec.create(view);
            } catch (e2) {
              logException(view.state, e2, "CodeMirror plugin crashed");
              this.deactivate();
            }
          }
        } else if (this.mustUpdate) {
          let update = this.mustUpdate;
          this.mustUpdate = null;
          if (this.value.update) {
            try {
              this.value.update(update);
            } catch (e2) {
              logException(update.state, e2, "CodeMirror plugin crashed");
              if (this.value.destroy)
                try {
                  this.value.destroy();
                } catch (_) {
                }
              this.deactivate();
            }
          }
        }
        return this;
      }
      destroy(view) {
        var _a;
        if ((_a = this.value) === null || _a === void 0 ? void 0 : _a.destroy) {
          try {
            this.value.destroy();
          } catch (e2) {
            logException(view.state, e2, "CodeMirror plugin crashed");
          }
        }
      }
      deactivate() {
        this.spec = this.value = null;
      }
    };
    editorAttributes = /* @__PURE__ */ Facet.define();
    contentAttributes = /* @__PURE__ */ Facet.define();
    decorations = /* @__PURE__ */ Facet.define();
    styleModule = /* @__PURE__ */ Facet.define();
    ChangedRange = class {
      constructor(fromA, toA, fromB, toB) {
        this.fromA = fromA;
        this.toA = toA;
        this.fromB = fromB;
        this.toB = toB;
      }
      join(other) {
        return new ChangedRange(Math.min(this.fromA, other.fromA), Math.max(this.toA, other.toA), Math.min(this.fromB, other.fromB), Math.max(this.toB, other.toB));
      }
      addToSet(set) {
        let i2 = set.length, me = this;
        for (; i2 > 0; i2--) {
          let range2 = set[i2 - 1];
          if (range2.fromA > me.toA)
            continue;
          if (range2.toA < me.fromA)
            break;
          me = me.join(range2);
          set.splice(i2 - 1, 1);
        }
        set.splice(i2, 0, me);
        return set;
      }
      static extendWithRanges(diff, ranges) {
        if (ranges.length == 0)
          return diff;
        let result = [];
        for (let dI = 0, rI = 0, posA = 0, posB = 0; ; dI++) {
          let next = dI == diff.length ? null : diff[dI], off = posA - posB;
          let end = next ? next.fromB : 1e9;
          while (rI < ranges.length && ranges[rI] < end) {
            let from = ranges[rI], to = ranges[rI + 1];
            let fromB = Math.max(posB, from), toB = Math.min(end, to);
            if (fromB <= toB)
              new ChangedRange(fromB + off, toB + off, fromB, toB).addToSet(result);
            if (to > end)
              break;
            else
              rI += 2;
          }
          if (!next)
            return result;
          new ChangedRange(next.fromA, next.toA, next.fromB, next.toB).addToSet(result);
          posA = next.toA;
          posB = next.toB;
        }
      }
    };
    ViewUpdate = class {
      constructor(view, state, transactions = none2) {
        this.view = view;
        this.state = state;
        this.transactions = transactions;
        this.flags = 0;
        this.startState = view.state;
        this.changes = ChangeSet.empty(this.startState.doc.length);
        for (let tr of transactions)
          this.changes = this.changes.compose(tr.changes);
        let changedRanges = [];
        this.changes.iterChangedRanges((fromA, toA, fromB, toB) => changedRanges.push(new ChangedRange(fromA, toA, fromB, toB)));
        this.changedRanges = changedRanges;
        let focus = view.hasFocus;
        if (focus != view.inputState.notifiedFocused) {
          view.inputState.notifiedFocused = focus;
          this.flags |= 1;
        }
      }
      get viewportChanged() {
        return (this.flags & 4) > 0;
      }
      get heightChanged() {
        return (this.flags & 2) > 0;
      }
      get geometryChanged() {
        return this.docChanged || (this.flags & (8 | 2)) > 0;
      }
      get focusChanged() {
        return (this.flags & 1) > 0;
      }
      get docChanged() {
        return !this.changes.empty;
      }
      get selectionSet() {
        return this.transactions.some((tr) => tr.selection);
      }
      get empty() {
        return this.flags == 0 && this.transactions.length == 0;
      }
    };
    Direction = /* @__PURE__ */ function(Direction2) {
      Direction2[Direction2["LTR"] = 0] = "LTR";
      Direction2[Direction2["RTL"] = 1] = "RTL";
      return Direction2;
    }(Direction || (Direction = {}));
    LTR = Direction.LTR;
    RTL = Direction.RTL;
    LowTypes = /* @__PURE__ */ dec("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008");
    ArabicTypes = /* @__PURE__ */ dec("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333");
    Brackets = /* @__PURE__ */ Object.create(null);
    BracketStack = [];
    for (let p of ["()", "[]", "{}"]) {
      let l = /* @__PURE__ */ p.charCodeAt(0), r2 = /* @__PURE__ */ p.charCodeAt(1);
      Brackets[l] = r2;
      Brackets[r2] = -l;
    }
    BidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
    BidiSpan = class {
      constructor(from, to, level) {
        this.from = from;
        this.to = to;
        this.level = level;
      }
      get dir() {
        return this.level % 2 ? RTL : LTR;
      }
      side(end, dir) {
        return this.dir == dir == end ? this.to : this.from;
      }
      static find(order, index2, level, assoc) {
        let maybe = -1;
        for (let i2 = 0; i2 < order.length; i2++) {
          let span = order[i2];
          if (span.from <= index2 && span.to >= index2) {
            if (span.level == level)
              return i2;
            if (maybe < 0 || (assoc != 0 ? assoc < 0 ? span.from < index2 : span.to > index2 : order[maybe].level > span.level))
              maybe = i2;
          }
        }
        if (maybe < 0)
          throw new RangeError("Index out of range");
        return maybe;
      }
    };
    types2 = [];
    movedOver = "";
    DOMReader = class {
      constructor(points, view) {
        this.points = points;
        this.view = view;
        this.text = "";
        this.lineBreak = view.state.lineBreak;
      }
      readRange(start, end) {
        if (!start)
          return this;
        let parent = start.parentNode;
        for (let cur = start; ; ) {
          this.findPointBefore(parent, cur);
          this.readNode(cur);
          let next = cur.nextSibling;
          if (next == end)
            break;
          let view = ContentView.get(cur), nextView = ContentView.get(next);
          if (view && nextView ? view.breakAfter : (view ? view.breakAfter : isBlockElement(cur)) || isBlockElement(next) && (cur.nodeName != "BR" || cur.cmIgnore))
            this.text += this.lineBreak;
          cur = next;
        }
        this.findPointBefore(parent, end);
        return this;
      }
      readNode(node) {
        if (node.cmIgnore)
          return;
        let view = ContentView.get(node);
        let fromView = view && view.overrideDOMText;
        let text;
        if (fromView != null)
          text = fromView.sliceString(0, void 0, this.lineBreak);
        else if (node.nodeType == 3)
          text = node.nodeValue;
        else if (node.nodeName == "BR")
          text = node.nextSibling ? this.lineBreak : "";
        else if (node.nodeType == 1)
          this.readRange(node.firstChild, null);
        if (text != null) {
          this.findPointIn(node, text.length);
          this.text += text;
          if (browser.chrome && this.view.inputState.lastKeyCode == 13 && !node.nextSibling && /\n\n$/.test(this.text))
            this.text = this.text.slice(0, -1);
        }
      }
      findPointBefore(node, next) {
        for (let point of this.points)
          if (point.node == node && node.childNodes[point.offset] == next)
            point.pos = this.text.length;
      }
      findPointIn(node, maxLen) {
        for (let point of this.points)
          if (point.node == node)
            point.pos = this.text.length + Math.min(point.offset, maxLen);
      }
    };
    DOMPoint = class {
      constructor(node, offset) {
        this.node = node;
        this.offset = offset;
        this.pos = -1;
      }
    };
    DocView = class extends ContentView {
      constructor(view) {
        super();
        this.view = view;
        this.compositionDeco = Decoration.none;
        this.decorations = [];
        this.pluginDecorationLength = 0;
        this.minWidth = 0;
        this.minWidthFrom = 0;
        this.minWidthTo = 0;
        this.impreciseAnchor = null;
        this.impreciseHead = null;
        this.forceSelection = false;
        this.lastUpdate = Date.now();
        this.setDOM(view.contentDOM);
        this.children = [new LineView()];
        this.children[0].setParent(this);
        this.updateDeco();
        this.updateInner([new ChangedRange(0, 0, 0, view.state.doc.length)], 0);
      }
      get root() {
        return this.view.root;
      }
      get editorView() {
        return this.view;
      }
      get length() {
        return this.view.state.doc.length;
      }
      update(update) {
        let changedRanges = update.changedRanges;
        if (this.minWidth > 0 && changedRanges.length) {
          if (!changedRanges.every(({ fromA, toA }) => toA < this.minWidthFrom || fromA > this.minWidthTo)) {
            this.minWidth = this.minWidthFrom = this.minWidthTo = 0;
          } else {
            this.minWidthFrom = update.changes.mapPos(this.minWidthFrom, 1);
            this.minWidthTo = update.changes.mapPos(this.minWidthTo, 1);
          }
        }
        if (this.view.inputState.composing < 0)
          this.compositionDeco = Decoration.none;
        else if (update.transactions.length || this.dirty)
          this.compositionDeco = computeCompositionDeco(this.view, update.changes);
        if ((browser.ie || browser.chrome) && !this.compositionDeco.size && update && update.state.doc.lines != update.startState.doc.lines)
          this.forceSelection = true;
        let prevDeco = this.decorations, deco = this.updateDeco();
        let decoDiff = findChangedDeco(prevDeco, deco, update.changes);
        changedRanges = ChangedRange.extendWithRanges(changedRanges, decoDiff);
        if (this.dirty == 0 && changedRanges.length == 0) {
          return false;
        } else {
          this.updateInner(changedRanges, update.startState.doc.length);
          if (update.transactions.length)
            this.lastUpdate = Date.now();
          return true;
        }
      }
      updateInner(changes, oldLength) {
        this.view.viewState.mustMeasureContent = true;
        this.updateChildren(changes, oldLength);
        let { observer } = this.view;
        observer.ignore(() => {
          this.dom.style.height = this.view.viewState.contentHeight + "px";
          this.dom.style.minWidth = this.minWidth ? this.minWidth + "px" : "";
          let track = browser.chrome || browser.ios ? { node: observer.selectionRange.focusNode, written: false } : void 0;
          this.sync(track);
          this.dirty = 0;
          if (track && (track.written || observer.selectionRange.focusNode != track.node))
            this.forceSelection = true;
          this.dom.style.height = "";
        });
        let gaps = [];
        if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length) {
          for (let child of this.children)
            if (child instanceof BlockWidgetView && child.widget instanceof BlockGapWidget)
              gaps.push(child.dom);
        }
        observer.updateGaps(gaps);
      }
      updateChildren(changes, oldLength) {
        let cursor = this.childCursor(oldLength);
        for (let i2 = changes.length - 1; ; i2--) {
          let next = i2 >= 0 ? changes[i2] : null;
          if (!next)
            break;
          let { fromA, toA, fromB, toB } = next;
          let { content: content2, breakAtStart, openStart, openEnd } = ContentBuilder.build(this.view.state.doc, fromB, toB, this.decorations, this.pluginDecorationLength);
          let { i: toI, off: toOff } = cursor.findPos(toA, 1);
          let { i: fromI, off: fromOff } = cursor.findPos(fromA, -1);
          replaceRange(this, fromI, fromOff, toI, toOff, content2, breakAtStart, openStart, openEnd);
        }
      }
      updateSelection(mustRead = false, fromPointer = false) {
        if (mustRead)
          this.view.observer.readSelectionRange();
        if (!(fromPointer || this.mayControlSelection()) || browser.ios && this.view.inputState.rapidCompositionStart)
          return;
        let force = this.forceSelection;
        this.forceSelection = false;
        let main = this.view.state.selection.main;
        let anchor = this.domAtPos(main.anchor);
        let head = main.empty ? anchor : this.domAtPos(main.head);
        if (browser.gecko && main.empty && betweenUneditable(anchor)) {
          let dummy = document.createTextNode("");
          this.view.observer.ignore(() => anchor.node.insertBefore(dummy, anchor.node.childNodes[anchor.offset] || null));
          anchor = head = new DOMPos(dummy, 0);
          force = true;
        }
        let domSel = this.view.observer.selectionRange;
        if (force || !domSel.focusNode || !isEquivalentPosition(anchor.node, anchor.offset, domSel.anchorNode, domSel.anchorOffset) || !isEquivalentPosition(head.node, head.offset, domSel.focusNode, domSel.focusOffset)) {
          this.view.observer.ignore(() => {
            if (browser.android && browser.chrome && this.dom.contains(domSel.focusNode) && inUneditable(domSel.focusNode, this.dom)) {
              this.dom.blur();
              this.dom.focus({ preventScroll: true });
            }
            let rawSel = getSelection(this.root);
            if (main.empty) {
              if (browser.gecko) {
                let nextTo = nextToUneditable(anchor.node, anchor.offset);
                if (nextTo && nextTo != (1 | 2)) {
                  let text = nearbyTextNode(anchor.node, anchor.offset, nextTo == 1 ? 1 : -1);
                  if (text)
                    anchor = new DOMPos(text, nextTo == 1 ? 0 : text.nodeValue.length);
                }
              }
              rawSel.collapse(anchor.node, anchor.offset);
              if (main.bidiLevel != null && domSel.cursorBidiLevel != null)
                domSel.cursorBidiLevel = main.bidiLevel;
            } else if (rawSel.extend) {
              rawSel.collapse(anchor.node, anchor.offset);
              rawSel.extend(head.node, head.offset);
            } else {
              let range2 = document.createRange();
              if (main.anchor > main.head)
                [anchor, head] = [head, anchor];
              range2.setEnd(head.node, head.offset);
              range2.setStart(anchor.node, anchor.offset);
              rawSel.removeAllRanges();
              rawSel.addRange(range2);
            }
          });
          this.view.observer.setSelectionRange(anchor, head);
        }
        this.impreciseAnchor = anchor.precise ? null : new DOMPos(domSel.anchorNode, domSel.anchorOffset);
        this.impreciseHead = head.precise ? null : new DOMPos(domSel.focusNode, domSel.focusOffset);
      }
      enforceCursorAssoc() {
        if (this.compositionDeco.size)
          return;
        let cursor = this.view.state.selection.main;
        let sel = getSelection(this.root);
        if (!cursor.empty || !cursor.assoc || !sel.modify)
          return;
        let line = LineView.find(this, cursor.head);
        if (!line)
          return;
        let lineStart = line.posAtStart;
        if (cursor.head == lineStart || cursor.head == lineStart + line.length)
          return;
        let before = this.coordsAt(cursor.head, -1), after = this.coordsAt(cursor.head, 1);
        if (!before || !after || before.bottom > after.top)
          return;
        let dom = this.domAtPos(cursor.head + cursor.assoc);
        sel.collapse(dom.node, dom.offset);
        sel.modify("move", cursor.assoc < 0 ? "forward" : "backward", "lineboundary");
      }
      mayControlSelection() {
        return this.view.state.facet(editable) ? this.root.activeElement == this.dom : hasSelection(this.dom, this.view.observer.selectionRange);
      }
      nearest(dom) {
        for (let cur = dom; cur; ) {
          let domView = ContentView.get(cur);
          if (domView && domView.rootView == this)
            return domView;
          cur = cur.parentNode;
        }
        return null;
      }
      posFromDOM(node, offset) {
        let view = this.nearest(node);
        if (!view)
          throw new RangeError("Trying to find position for a DOM position outside of the document");
        return view.localPosFromDOM(node, offset) + view.posAtStart;
      }
      domAtPos(pos) {
        let { i: i2, off } = this.childCursor().findPos(pos, -1);
        for (; i2 < this.children.length - 1; ) {
          let child = this.children[i2];
          if (off < child.length || child instanceof LineView)
            break;
          i2++;
          off = 0;
        }
        return this.children[i2].domAtPos(off);
      }
      coordsAt(pos, side) {
        for (let off = this.length, i2 = this.children.length - 1; ; i2--) {
          let child = this.children[i2], start = off - child.breakAfter - child.length;
          if (pos > start || pos == start && child.type != BlockType.WidgetBefore && child.type != BlockType.WidgetAfter && (!i2 || side == 2 || this.children[i2 - 1].breakAfter || this.children[i2 - 1].type == BlockType.WidgetBefore && side > -2))
            return child.coordsAt(pos - start, side);
          off = start;
        }
      }
      measureVisibleLineHeights() {
        let result = [], { from, to } = this.view.viewState.viewport;
        let contentWidth = this.view.contentDOM.clientWidth;
        let isWider = contentWidth > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1;
        let widest = -1;
        for (let pos = 0, i2 = 0; i2 < this.children.length; i2++) {
          let child = this.children[i2], end = pos + child.length;
          if (end > to)
            break;
          if (pos >= from) {
            let childRect = child.dom.getBoundingClientRect();
            result.push(childRect.height);
            if (isWider) {
              let last = child.dom.lastChild;
              let rects = last ? clientRectsFor(last) : [];
              if (rects.length) {
                let rect = rects[rects.length - 1];
                let width = this.view.textDirection == Direction.LTR ? rect.right - childRect.left : childRect.right - rect.left;
                if (width > widest) {
                  widest = width;
                  this.minWidth = contentWidth;
                  this.minWidthFrom = pos;
                  this.minWidthTo = end;
                }
              }
            }
          }
          pos = end + child.breakAfter;
        }
        return result;
      }
      measureTextSize() {
        for (let child of this.children) {
          if (child instanceof LineView) {
            let measure = child.measureTextSize();
            if (measure)
              return measure;
          }
        }
        let dummy = document.createElement("div"), lineHeight, charWidth;
        dummy.className = "cm-line";
        dummy.textContent = "abc def ghi jkl mno pqr stu";
        this.view.observer.ignore(() => {
          this.dom.appendChild(dummy);
          let rect = clientRectsFor(dummy.firstChild)[0];
          lineHeight = dummy.getBoundingClientRect().height;
          charWidth = rect ? rect.width / 27 : 7;
          dummy.remove();
        });
        return { lineHeight, charWidth };
      }
      childCursor(pos = this.length) {
        let i2 = this.children.length;
        if (i2)
          pos -= this.children[--i2].length;
        return new ChildCursor(this.children, pos, i2);
      }
      computeBlockGapDeco() {
        let deco = [], vs = this.view.viewState;
        for (let pos = 0, i2 = 0; ; i2++) {
          let next = i2 == vs.viewports.length ? null : vs.viewports[i2];
          let end = next ? next.from - 1 : this.length;
          if (end > pos) {
            let height = vs.lineBlockAt(end).bottom - vs.lineBlockAt(pos).top;
            deco.push(Decoration.replace({ widget: new BlockGapWidget(height), block: true, inclusive: true }).range(pos, end));
          }
          if (!next)
            break;
          pos = next.to + 1;
        }
        return Decoration.set(deco);
      }
      updateDeco() {
        let pluginDecorations = this.view.pluginField(PluginField.decorations);
        this.pluginDecorationLength = pluginDecorations.length;
        return this.decorations = [
          ...pluginDecorations,
          ...this.view.state.facet(decorations),
          this.compositionDeco,
          this.computeBlockGapDeco(),
          this.view.viewState.lineGapDeco
        ];
      }
      scrollIntoView(target) {
        let { range: range2 } = target;
        let rect = this.coordsAt(range2.head, range2.empty ? range2.assoc : range2.head > range2.anchor ? -1 : 1), other;
        if (!rect)
          return;
        if (!range2.empty && (other = this.coordsAt(range2.anchor, range2.anchor > range2.head ? -1 : 1)))
          rect = {
            left: Math.min(rect.left, other.left),
            top: Math.min(rect.top, other.top),
            right: Math.max(rect.right, other.right),
            bottom: Math.max(rect.bottom, other.bottom)
          };
        let mLeft = 0, mRight = 0, mTop = 0, mBottom = 0;
        for (let margins of this.view.pluginField(PluginField.scrollMargins))
          if (margins) {
            let { left, right, top: top2, bottom } = margins;
            if (left != null)
              mLeft = Math.max(mLeft, left);
            if (right != null)
              mRight = Math.max(mRight, right);
            if (top2 != null)
              mTop = Math.max(mTop, top2);
            if (bottom != null)
              mBottom = Math.max(mBottom, bottom);
          }
        let targetRect = {
          left: rect.left - mLeft,
          top: rect.top - mTop,
          right: rect.right + mRight,
          bottom: rect.bottom + mBottom
        };
        scrollRectIntoView(this.view.scrollDOM, targetRect, range2.head < range2.anchor ? -1 : 1, target.x, target.y, target.xMargin, target.yMargin, this.view.textDirection == Direction.LTR);
      }
    };
    BlockGapWidget = class extends WidgetType {
      constructor(height) {
        super();
        this.height = height;
      }
      toDOM() {
        let elt = document.createElement("div");
        this.updateDOM(elt);
        return elt;
      }
      eq(other) {
        return other.height == this.height;
      }
      updateDOM(elt) {
        elt.style.height = this.height + "px";
        return true;
      }
      get estimatedHeight() {
        return this.height;
      }
    };
    CompositionWidget = class extends WidgetType {
      constructor(top2, text) {
        super();
        this.top = top2;
        this.text = text;
      }
      eq(other) {
        return this.top == other.top && this.text == other.text;
      }
      toDOM() {
        return this.top;
      }
      ignoreEvent() {
        return false;
      }
      get customView() {
        return CompositionView;
      }
    };
    DecorationComparator$1 = class {
      constructor() {
        this.changes = [];
      }
      compareRange(from, to) {
        addRange(from, to, this.changes);
      }
      comparePoint(from, to) {
        addRange(from, to, this.changes);
      }
    };
    InputState = class {
      constructor(view) {
        this.lastKeyCode = 0;
        this.lastKeyTime = 0;
        this.pendingIOSKey = void 0;
        this.lastSelectionOrigin = null;
        this.lastSelectionTime = 0;
        this.lastEscPress = 0;
        this.lastContextMenu = 0;
        this.scrollHandlers = [];
        this.registeredEvents = [];
        this.customHandlers = [];
        this.composing = -1;
        this.compositionFirstChange = null;
        this.compositionEndedAt = 0;
        this.rapidCompositionStart = false;
        this.mouseSelection = null;
        for (let type in handlers) {
          let handler2 = handlers[type];
          view.contentDOM.addEventListener(type, (event) => {
            if (type == "keydown" && this.keydown(view, event))
              return;
            if (!eventBelongsToEditor(view, event) || this.ignoreDuringComposition(event))
              return;
            if (this.mustFlushObserver(event))
              view.observer.forceFlush();
            if (this.runCustomHandlers(type, view, event))
              event.preventDefault();
            else
              handler2(view, event);
          });
          this.registeredEvents.push(type);
        }
        this.notifiedFocused = view.hasFocus;
        this.ensureHandlers(view);
        if (browser.safari)
          view.contentDOM.addEventListener("input", () => null);
      }
      setSelectionOrigin(origin) {
        this.lastSelectionOrigin = origin;
        this.lastSelectionTime = Date.now();
      }
      ensureHandlers(view) {
        let handlers2 = this.customHandlers = view.pluginField(domEventHandlers);
        for (let set of handlers2) {
          for (let type in set.handlers)
            if (this.registeredEvents.indexOf(type) < 0 && type != "scroll") {
              this.registeredEvents.push(type);
              view.contentDOM.addEventListener(type, (event) => {
                if (!eventBelongsToEditor(view, event))
                  return;
                if (this.runCustomHandlers(type, view, event))
                  event.preventDefault();
              });
            }
        }
      }
      runCustomHandlers(type, view, event) {
        for (let set of this.customHandlers) {
          let handler2 = set.handlers[type];
          if (handler2) {
            try {
              if (handler2.call(set.plugin, event, view) || event.defaultPrevented)
                return true;
            } catch (e2) {
              logException(view.state, e2);
            }
          }
        }
        return false;
      }
      runScrollHandlers(view, event) {
        for (let set of this.customHandlers) {
          let handler2 = set.handlers.scroll;
          if (handler2) {
            try {
              handler2.call(set.plugin, event, view);
            } catch (e2) {
              logException(view.state, e2);
            }
          }
        }
      }
      keydown(view, event) {
        this.lastKeyCode = event.keyCode;
        this.lastKeyTime = Date.now();
        if (this.screenKeyEvent(view, event))
          return true;
        if (browser.android && browser.chrome && !event.synthetic && (event.keyCode == 13 || event.keyCode == 8)) {
          view.observer.delayAndroidKey(event.key, event.keyCode);
          return true;
        }
        let pending;
        if (browser.ios && (pending = PendingKeys.find((key) => key.keyCode == event.keyCode)) && !(event.ctrlKey || event.altKey || event.metaKey) && !event.synthetic) {
          this.pendingIOSKey = pending;
          setTimeout(() => this.flushIOSKey(view), 250);
          return true;
        }
        return false;
      }
      flushIOSKey(view) {
        let key = this.pendingIOSKey;
        if (!key)
          return false;
        this.pendingIOSKey = void 0;
        return dispatchKey(view.contentDOM, key.key, key.keyCode);
      }
      ignoreDuringComposition(event) {
        if (!/^key/.test(event.type))
          return false;
        if (this.composing > 0)
          return true;
        if (browser.safari && Date.now() - this.compositionEndedAt < 500) {
          this.compositionEndedAt = 0;
          return true;
        }
        return false;
      }
      screenKeyEvent(view, event) {
        let protectedTab = event.keyCode == 9 && Date.now() < this.lastEscPress + 2e3;
        if (event.keyCode == 27)
          this.lastEscPress = Date.now();
        else if (modifierCodes.indexOf(event.keyCode) < 0)
          this.lastEscPress = 0;
        return protectedTab;
      }
      mustFlushObserver(event) {
        return event.type == "keydown" && event.keyCode != 229 || event.type == "compositionend" && !browser.ios;
      }
      startMouseSelection(mouseSelection) {
        if (this.mouseSelection)
          this.mouseSelection.destroy();
        this.mouseSelection = mouseSelection;
      }
      update(update) {
        if (this.mouseSelection)
          this.mouseSelection.update(update);
        if (update.transactions.length)
          this.lastKeyCode = this.lastSelectionTime = 0;
      }
      destroy() {
        if (this.mouseSelection)
          this.mouseSelection.destroy();
      }
    };
    PendingKeys = [
      { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
      { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
      { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
    ];
    modifierCodes = [16, 17, 18, 20, 91, 92, 224, 225];
    MouseSelection = class {
      constructor(view, startEvent, style, mustSelect) {
        this.view = view;
        this.style = style;
        this.mustSelect = mustSelect;
        this.lastEvent = startEvent;
        let doc2 = view.contentDOM.ownerDocument;
        doc2.addEventListener("mousemove", this.move = this.move.bind(this));
        doc2.addEventListener("mouseup", this.up = this.up.bind(this));
        this.extend = startEvent.shiftKey;
        this.multiple = view.state.facet(EditorState.allowMultipleSelections) && addsSelectionRange(view, startEvent);
        this.dragMove = dragMovesSelection(view, startEvent);
        this.dragging = isInPrimarySelection(view, startEvent) && getClickType(startEvent) == 1 ? null : false;
        if (this.dragging === false) {
          startEvent.preventDefault();
          this.select(startEvent);
        }
      }
      move(event) {
        if (event.buttons == 0)
          return this.destroy();
        if (this.dragging !== false)
          return;
        this.select(this.lastEvent = event);
      }
      up(event) {
        if (this.dragging == null)
          this.select(this.lastEvent);
        if (!this.dragging)
          event.preventDefault();
        this.destroy();
      }
      destroy() {
        let doc2 = this.view.contentDOM.ownerDocument;
        doc2.removeEventListener("mousemove", this.move);
        doc2.removeEventListener("mouseup", this.up);
        this.view.inputState.mouseSelection = null;
      }
      select(event) {
        let selection = this.style.get(event, this.extend, this.multiple);
        if (this.mustSelect || !selection.eq(this.view.state.selection) || selection.main.assoc != this.view.state.selection.main.assoc)
          this.view.dispatch({
            selection,
            userEvent: "select.pointer",
            scrollIntoView: true
          });
        this.mustSelect = false;
      }
      update(update) {
        if (update.docChanged && this.dragging)
          this.dragging = this.dragging.map(update.changes);
        if (this.style.update(update))
          setTimeout(() => this.select(this.lastEvent), 20);
      }
    };
    handlers = /* @__PURE__ */ Object.create(null);
    brokenClipboardAPI = browser.ie && browser.ie_version < 15 || browser.ios && browser.webkit_version < 604;
    handlers.keydown = (view, event) => {
      view.inputState.setSelectionOrigin("select");
    };
    lastTouch = 0;
    handlers.touchstart = (view, e2) => {
      lastTouch = Date.now();
      view.inputState.setSelectionOrigin("select.pointer");
    };
    handlers.touchmove = (view) => {
      view.inputState.setSelectionOrigin("select.pointer");
    };
    handlers.mousedown = (view, event) => {
      view.observer.flush();
      if (lastTouch > Date.now() - 2e3 && getClickType(event) == 1)
        return;
      let style = null;
      for (let makeStyle of view.state.facet(mouseSelectionStyle)) {
        style = makeStyle(view, event);
        if (style)
          break;
      }
      if (!style && event.button == 0)
        style = basicMouseSelection(view, event);
      if (style) {
        let mustFocus = view.root.activeElement != view.contentDOM;
        if (mustFocus)
          view.observer.ignore(() => focusPreventScroll(view.contentDOM));
        view.inputState.startMouseSelection(new MouseSelection(view, event, style, mustFocus));
      }
    };
    insideY = (y, rect) => y >= rect.top && y <= rect.bottom;
    inside = (x2, y, rect) => insideY(y, rect) && x2 >= rect.left && x2 <= rect.right;
    BadMouseDetail = browser.ie && browser.ie_version <= 11;
    lastMouseDown = null;
    lastMouseDownCount = 0;
    lastMouseDownTime = 0;
    handlers.dragstart = (view, event) => {
      let { selection: { main } } = view.state;
      let { mouseSelection } = view.inputState;
      if (mouseSelection)
        mouseSelection.dragging = main;
      if (event.dataTransfer) {
        event.dataTransfer.setData("Text", view.state.sliceDoc(main.from, main.to));
        event.dataTransfer.effectAllowed = "copyMove";
      }
    };
    handlers.drop = (view, event) => {
      if (!event.dataTransfer)
        return;
      if (view.state.readOnly)
        return event.preventDefault();
      let files = event.dataTransfer.files;
      if (files && files.length) {
        event.preventDefault();
        let text = Array(files.length), read = 0;
        let finishFile = () => {
          if (++read == files.length)
            dropText(view, event, text.filter((s3) => s3 != null).join(view.state.lineBreak), false);
        };
        for (let i2 = 0; i2 < files.length; i2++) {
          let reader = new FileReader();
          reader.onerror = finishFile;
          reader.onload = () => {
            if (!/[\x00-\x08\x0e-\x1f]{2}/.test(reader.result))
              text[i2] = reader.result;
            finishFile();
          };
          reader.readAsText(files[i2]);
        }
      } else {
        dropText(view, event, event.dataTransfer.getData("Text"), true);
      }
    };
    handlers.paste = (view, event) => {
      if (view.state.readOnly)
        return event.preventDefault();
      view.observer.flush();
      let data = brokenClipboardAPI ? null : event.clipboardData;
      if (data) {
        doPaste(view, data.getData("text/plain"));
        event.preventDefault();
      } else {
        capturePaste(view);
      }
    };
    lastLinewiseCopy = null;
    handlers.copy = handlers.cut = (view, event) => {
      let { text, ranges, linewise } = copiedRange(view.state);
      if (!text && !linewise)
        return;
      lastLinewiseCopy = linewise ? text : null;
      let data = brokenClipboardAPI ? null : event.clipboardData;
      if (data) {
        event.preventDefault();
        data.clearData();
        data.setData("text/plain", text);
      } else {
        captureCopy(view, text);
      }
      if (event.type == "cut" && !view.state.readOnly)
        view.dispatch({
          changes: ranges,
          scrollIntoView: true,
          userEvent: "delete.cut"
        });
    };
    handlers.focus = handlers.blur = (view) => {
      setTimeout(() => {
        if (view.hasFocus != view.inputState.notifiedFocused)
          view.update([]);
      }, 10);
    };
    handlers.beforeprint = (view) => {
      view.viewState.printing = true;
      view.requestMeasure();
      setTimeout(() => {
        view.viewState.printing = false;
        view.requestMeasure();
      }, 2e3);
    };
    handlers.compositionstart = handlers.compositionupdate = (view) => {
      if (view.inputState.compositionFirstChange == null)
        view.inputState.compositionFirstChange = true;
      if (view.inputState.composing < 0) {
        view.inputState.composing = 0;
        if (view.docView.compositionDeco.size) {
          view.observer.flush();
          forceClearComposition(view, true);
        }
      }
    };
    handlers.compositionend = (view) => {
      view.inputState.composing = -1;
      view.inputState.compositionEndedAt = Date.now();
      view.inputState.compositionFirstChange = null;
      setTimeout(() => {
        if (view.inputState.composing < 0)
          forceClearComposition(view, false);
      }, 50);
    };
    handlers.contextmenu = (view) => {
      view.inputState.lastContextMenu = Date.now();
    };
    handlers.beforeinput = (view, event) => {
      var _a;
      let pending;
      if (browser.chrome && browser.android && (pending = PendingKeys.find((key) => key.inputType == event.inputType))) {
        view.observer.delayAndroidKey(pending.key, pending.keyCode);
        if (pending.key == "Backspace" || pending.key == "Delete") {
          let startViewHeight = ((_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.height) || 0;
          setTimeout(() => {
            var _a2;
            if ((((_a2 = window.visualViewport) === null || _a2 === void 0 ? void 0 : _a2.height) || 0) > startViewHeight + 10 && view.hasFocus) {
              view.contentDOM.blur();
              view.focus();
            }
          }, 100);
        }
      }
    };
    wrappingWhiteSpace = ["pre-wrap", "normal", "pre-line", "break-spaces"];
    HeightOracle = class {
      constructor() {
        this.doc = Text.empty;
        this.lineWrapping = false;
        this.direction = Direction.LTR;
        this.heightSamples = {};
        this.lineHeight = 14;
        this.charWidth = 7;
        this.lineLength = 30;
        this.heightChanged = false;
      }
      heightForGap(from, to) {
        let lines = this.doc.lineAt(to).number - this.doc.lineAt(from).number + 1;
        if (this.lineWrapping)
          lines += Math.ceil((to - from - lines * this.lineLength * 0.5) / this.lineLength);
        return this.lineHeight * lines;
      }
      heightForLine(length) {
        if (!this.lineWrapping)
          return this.lineHeight;
        let lines = 1 + Math.max(0, Math.ceil((length - this.lineLength) / (this.lineLength - 5)));
        return lines * this.lineHeight;
      }
      setDoc(doc2) {
        this.doc = doc2;
        return this;
      }
      mustRefreshForStyle(whiteSpace, direction) {
        return wrappingWhiteSpace.indexOf(whiteSpace) > -1 != this.lineWrapping || this.direction != direction;
      }
      mustRefreshForHeights(lineHeights) {
        let newHeight = false;
        for (let i2 = 0; i2 < lineHeights.length; i2++) {
          let h2 = lineHeights[i2];
          if (h2 < 0) {
            i2++;
          } else if (!this.heightSamples[Math.floor(h2 * 10)]) {
            newHeight = true;
            this.heightSamples[Math.floor(h2 * 10)] = true;
          }
        }
        return newHeight;
      }
      refresh(whiteSpace, direction, lineHeight, charWidth, lineLength, knownHeights) {
        let lineWrapping = wrappingWhiteSpace.indexOf(whiteSpace) > -1;
        let changed = Math.round(lineHeight) != Math.round(this.lineHeight) || this.lineWrapping != lineWrapping || this.direction != direction;
        this.lineWrapping = lineWrapping;
        this.direction = direction;
        this.lineHeight = lineHeight;
        this.charWidth = charWidth;
        this.lineLength = lineLength;
        if (changed) {
          this.heightSamples = {};
          for (let i2 = 0; i2 < knownHeights.length; i2++) {
            let h2 = knownHeights[i2];
            if (h2 < 0)
              i2++;
            else
              this.heightSamples[Math.floor(h2 * 10)] = true;
          }
        }
        return changed;
      }
    };
    MeasuredHeights = class {
      constructor(from, heights) {
        this.from = from;
        this.heights = heights;
        this.index = 0;
      }
      get more() {
        return this.index < this.heights.length;
      }
    };
    BlockInfo = class {
      constructor(from, length, top2, height, type) {
        this.from = from;
        this.length = length;
        this.top = top2;
        this.height = height;
        this.type = type;
      }
      get to() {
        return this.from + this.length;
      }
      get bottom() {
        return this.top + this.height;
      }
      join(other) {
        let detail = (Array.isArray(this.type) ? this.type : [this]).concat(Array.isArray(other.type) ? other.type : [other]);
        return new BlockInfo(this.from, this.length + other.length, this.top, this.height + other.height, detail);
      }
      moveY(offset) {
        return !offset ? this : new BlockInfo(this.from, this.length, this.top + offset, this.height, Array.isArray(this.type) ? this.type.map((b) => b.moveY(offset)) : this.type);
      }
    };
    QueryType = /* @__PURE__ */ function(QueryType2) {
      QueryType2[QueryType2["ByPos"] = 0] = "ByPos";
      QueryType2[QueryType2["ByHeight"] = 1] = "ByHeight";
      QueryType2[QueryType2["ByPosNoHeight"] = 2] = "ByPosNoHeight";
      return QueryType2;
    }(QueryType || (QueryType = {}));
    Epsilon = 1e-3;
    HeightMap = class {
      constructor(length, height, flags = 2) {
        this.length = length;
        this.height = height;
        this.flags = flags;
      }
      get outdated() {
        return (this.flags & 2) > 0;
      }
      set outdated(value) {
        this.flags = (value ? 2 : 0) | this.flags & ~2;
      }
      setHeight(oracle, height) {
        if (this.height != height) {
          if (Math.abs(this.height - height) > Epsilon)
            oracle.heightChanged = true;
          this.height = height;
        }
      }
      replace(_from, _to, nodes) {
        return HeightMap.of(nodes);
      }
      decomposeLeft(_to, result) {
        result.push(this);
      }
      decomposeRight(_from, result) {
        result.push(this);
      }
      applyChanges(decorations2, oldDoc, oracle, changes) {
        let me = this;
        for (let i2 = changes.length - 1; i2 >= 0; i2--) {
          let { fromA, toA, fromB, toB } = changes[i2];
          let start = me.lineAt(fromA, QueryType.ByPosNoHeight, oldDoc, 0, 0);
          let end = start.to >= toA ? start : me.lineAt(toA, QueryType.ByPosNoHeight, oldDoc, 0, 0);
          toB += end.to - toA;
          toA = end.to;
          while (i2 > 0 && start.from <= changes[i2 - 1].toA) {
            fromA = changes[i2 - 1].fromA;
            fromB = changes[i2 - 1].fromB;
            i2--;
            if (fromA < start.from)
              start = me.lineAt(fromA, QueryType.ByPosNoHeight, oldDoc, 0, 0);
          }
          fromB += start.from - fromA;
          fromA = start.from;
          let nodes = NodeBuilder.build(oracle, decorations2, fromB, toB);
          me = me.replace(fromA, toA, nodes);
        }
        return me.updateHeight(oracle, 0);
      }
      static empty() {
        return new HeightMapText(0, 0);
      }
      static of(nodes) {
        if (nodes.length == 1)
          return nodes[0];
        let i2 = 0, j = nodes.length, before = 0, after = 0;
        for (; ; ) {
          if (i2 == j) {
            if (before > after * 2) {
              let split = nodes[i2 - 1];
              if (split.break)
                nodes.splice(--i2, 1, split.left, null, split.right);
              else
                nodes.splice(--i2, 1, split.left, split.right);
              j += 1 + split.break;
              before -= split.size;
            } else if (after > before * 2) {
              let split = nodes[j];
              if (split.break)
                nodes.splice(j, 1, split.left, null, split.right);
              else
                nodes.splice(j, 1, split.left, split.right);
              j += 2 + split.break;
              after -= split.size;
            } else {
              break;
            }
          } else if (before < after) {
            let next = nodes[i2++];
            if (next)
              before += next.size;
          } else {
            let next = nodes[--j];
            if (next)
              after += next.size;
          }
        }
        let brk = 0;
        if (nodes[i2 - 1] == null) {
          brk = 1;
          i2--;
        } else if (nodes[i2] == null) {
          brk = 1;
          j++;
        }
        return new HeightMapBranch(HeightMap.of(nodes.slice(0, i2)), brk, HeightMap.of(nodes.slice(j)));
      }
    };
    HeightMap.prototype.size = 1;
    HeightMapBlock = class extends HeightMap {
      constructor(length, height, type) {
        super(length, height);
        this.type = type;
      }
      blockAt(_height, _doc, top2, offset) {
        return new BlockInfo(offset, this.length, top2, this.height, this.type);
      }
      lineAt(_value, _type, doc2, top2, offset) {
        return this.blockAt(0, doc2, top2, offset);
      }
      forEachLine(_from, _to, doc2, top2, offset, f3) {
        f3(this.blockAt(0, doc2, top2, offset));
      }
      updateHeight(oracle, offset = 0, _force = false, measured) {
        if (measured && measured.from <= offset && measured.more)
          this.setHeight(oracle, measured.heights[measured.index++]);
        this.outdated = false;
        return this;
      }
      toString() {
        return `block(${this.length})`;
      }
    };
    HeightMapText = class extends HeightMapBlock {
      constructor(length, height) {
        super(length, height, BlockType.Text);
        this.collapsed = 0;
        this.widgetHeight = 0;
      }
      replace(_from, _to, nodes) {
        let node = nodes[0];
        if (nodes.length == 1 && (node instanceof HeightMapText || node instanceof HeightMapGap && node.flags & 4) && Math.abs(this.length - node.length) < 10) {
          if (node instanceof HeightMapGap)
            node = new HeightMapText(node.length, this.height);
          else
            node.height = this.height;
          if (!this.outdated)
            node.outdated = false;
          return node;
        } else {
          return HeightMap.of(nodes);
        }
      }
      updateHeight(oracle, offset = 0, force = false, measured) {
        if (measured && measured.from <= offset && measured.more)
          this.setHeight(oracle, measured.heights[measured.index++]);
        else if (force || this.outdated)
          this.setHeight(oracle, Math.max(this.widgetHeight, oracle.heightForLine(this.length - this.collapsed)));
        this.outdated = false;
        return this;
      }
      toString() {
        return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
      }
    };
    HeightMapGap = class extends HeightMap {
      constructor(length) {
        super(length, 0);
      }
      lines(doc2, offset) {
        let firstLine = doc2.lineAt(offset).number, lastLine = doc2.lineAt(offset + this.length).number;
        return { firstLine, lastLine, lineHeight: this.height / (lastLine - firstLine + 1) };
      }
      blockAt(height, doc2, top2, offset) {
        let { firstLine, lastLine, lineHeight } = this.lines(doc2, offset);
        let line = Math.max(0, Math.min(lastLine - firstLine, Math.floor((height - top2) / lineHeight)));
        let { from, length } = doc2.line(firstLine + line);
        return new BlockInfo(from, length, top2 + lineHeight * line, lineHeight, BlockType.Text);
      }
      lineAt(value, type, doc2, top2, offset) {
        if (type == QueryType.ByHeight)
          return this.blockAt(value, doc2, top2, offset);
        if (type == QueryType.ByPosNoHeight) {
          let { from: from2, to } = doc2.lineAt(value);
          return new BlockInfo(from2, to - from2, 0, 0, BlockType.Text);
        }
        let { firstLine, lineHeight } = this.lines(doc2, offset);
        let { from, length, number: number2 } = doc2.lineAt(value);
        return new BlockInfo(from, length, top2 + lineHeight * (number2 - firstLine), lineHeight, BlockType.Text);
      }
      forEachLine(from, to, doc2, top2, offset, f3) {
        let { firstLine, lineHeight } = this.lines(doc2, offset);
        for (let pos = Math.max(from, offset), end = Math.min(offset + this.length, to); pos <= end; ) {
          let line = doc2.lineAt(pos);
          if (pos == from)
            top2 += lineHeight * (line.number - firstLine);
          f3(new BlockInfo(line.from, line.length, top2, lineHeight, BlockType.Text));
          top2 += lineHeight;
          pos = line.to + 1;
        }
      }
      replace(from, to, nodes) {
        let after = this.length - to;
        if (after > 0) {
          let last = nodes[nodes.length - 1];
          if (last instanceof HeightMapGap)
            nodes[nodes.length - 1] = new HeightMapGap(last.length + after);
          else
            nodes.push(null, new HeightMapGap(after - 1));
        }
        if (from > 0) {
          let first = nodes[0];
          if (first instanceof HeightMapGap)
            nodes[0] = new HeightMapGap(from + first.length);
          else
            nodes.unshift(new HeightMapGap(from - 1), null);
        }
        return HeightMap.of(nodes);
      }
      decomposeLeft(to, result) {
        result.push(new HeightMapGap(to - 1), null);
      }
      decomposeRight(from, result) {
        result.push(null, new HeightMapGap(this.length - from - 1));
      }
      updateHeight(oracle, offset = 0, force = false, measured) {
        let end = offset + this.length;
        if (measured && measured.from <= offset + this.length && measured.more) {
          let nodes = [], pos = Math.max(offset, measured.from), singleHeight = -1;
          let wasChanged = oracle.heightChanged;
          if (measured.from > offset)
            nodes.push(new HeightMapGap(measured.from - offset - 1).updateHeight(oracle, offset));
          while (pos <= end && measured.more) {
            let len = oracle.doc.lineAt(pos).length;
            if (nodes.length)
              nodes.push(null);
            let height = measured.heights[measured.index++];
            if (singleHeight == -1)
              singleHeight = height;
            else if (Math.abs(height - singleHeight) >= Epsilon)
              singleHeight = -2;
            let line = new HeightMapText(len, height);
            line.outdated = false;
            nodes.push(line);
            pos += len + 1;
          }
          if (pos <= end)
            nodes.push(null, new HeightMapGap(end - pos).updateHeight(oracle, pos));
          let result = HeightMap.of(nodes);
          oracle.heightChanged = wasChanged || singleHeight < 0 || Math.abs(result.height - this.height) >= Epsilon || Math.abs(singleHeight - this.lines(oracle.doc, offset).lineHeight) >= Epsilon;
          return result;
        } else if (force || this.outdated) {
          this.setHeight(oracle, oracle.heightForGap(offset, offset + this.length));
          this.outdated = false;
        }
        return this;
      }
      toString() {
        return `gap(${this.length})`;
      }
    };
    HeightMapBranch = class extends HeightMap {
      constructor(left, brk, right) {
        super(left.length + brk + right.length, left.height + right.height, brk | (left.outdated || right.outdated ? 2 : 0));
        this.left = left;
        this.right = right;
        this.size = left.size + right.size;
      }
      get break() {
        return this.flags & 1;
      }
      blockAt(height, doc2, top2, offset) {
        let mid = top2 + this.left.height;
        return height < mid ? this.left.blockAt(height, doc2, top2, offset) : this.right.blockAt(height, doc2, mid, offset + this.left.length + this.break);
      }
      lineAt(value, type, doc2, top2, offset) {
        let rightTop = top2 + this.left.height, rightOffset = offset + this.left.length + this.break;
        let left = type == QueryType.ByHeight ? value < rightTop : value < rightOffset;
        let base3 = left ? this.left.lineAt(value, type, doc2, top2, offset) : this.right.lineAt(value, type, doc2, rightTop, rightOffset);
        if (this.break || (left ? base3.to < rightOffset : base3.from > rightOffset))
          return base3;
        let subQuery = type == QueryType.ByPosNoHeight ? QueryType.ByPosNoHeight : QueryType.ByPos;
        if (left)
          return base3.join(this.right.lineAt(rightOffset, subQuery, doc2, rightTop, rightOffset));
        else
          return this.left.lineAt(rightOffset, subQuery, doc2, top2, offset).join(base3);
      }
      forEachLine(from, to, doc2, top2, offset, f3) {
        let rightTop = top2 + this.left.height, rightOffset = offset + this.left.length + this.break;
        if (this.break) {
          if (from < rightOffset)
            this.left.forEachLine(from, to, doc2, top2, offset, f3);
          if (to >= rightOffset)
            this.right.forEachLine(from, to, doc2, rightTop, rightOffset, f3);
        } else {
          let mid = this.lineAt(rightOffset, QueryType.ByPos, doc2, top2, offset);
          if (from < mid.from)
            this.left.forEachLine(from, mid.from - 1, doc2, top2, offset, f3);
          if (mid.to >= from && mid.from <= to)
            f3(mid);
          if (to > mid.to)
            this.right.forEachLine(mid.to + 1, to, doc2, rightTop, rightOffset, f3);
        }
      }
      replace(from, to, nodes) {
        let rightStart = this.left.length + this.break;
        if (to < rightStart)
          return this.balanced(this.left.replace(from, to, nodes), this.right);
        if (from > this.left.length)
          return this.balanced(this.left, this.right.replace(from - rightStart, to - rightStart, nodes));
        let result = [];
        if (from > 0)
          this.decomposeLeft(from, result);
        let left = result.length;
        for (let node of nodes)
          result.push(node);
        if (from > 0)
          mergeGaps(result, left - 1);
        if (to < this.length) {
          let right = result.length;
          this.decomposeRight(to, result);
          mergeGaps(result, right);
        }
        return HeightMap.of(result);
      }
      decomposeLeft(to, result) {
        let left = this.left.length;
        if (to <= left)
          return this.left.decomposeLeft(to, result);
        result.push(this.left);
        if (this.break) {
          left++;
          if (to >= left)
            result.push(null);
        }
        if (to > left)
          this.right.decomposeLeft(to - left, result);
      }
      decomposeRight(from, result) {
        let left = this.left.length, right = left + this.break;
        if (from >= right)
          return this.right.decomposeRight(from - right, result);
        if (from < left)
          this.left.decomposeRight(from, result);
        if (this.break && from < right)
          result.push(null);
        result.push(this.right);
      }
      balanced(left, right) {
        if (left.size > 2 * right.size || right.size > 2 * left.size)
          return HeightMap.of(this.break ? [left, null, right] : [left, right]);
        this.left = left;
        this.right = right;
        this.height = left.height + right.height;
        this.outdated = left.outdated || right.outdated;
        this.size = left.size + right.size;
        this.length = left.length + this.break + right.length;
        return this;
      }
      updateHeight(oracle, offset = 0, force = false, measured) {
        let { left, right } = this, rightStart = offset + left.length + this.break, rebalance = null;
        if (measured && measured.from <= offset + left.length && measured.more)
          rebalance = left = left.updateHeight(oracle, offset, force, measured);
        else
          left.updateHeight(oracle, offset, force);
        if (measured && measured.from <= rightStart + right.length && measured.more)
          rebalance = right = right.updateHeight(oracle, rightStart, force, measured);
        else
          right.updateHeight(oracle, rightStart, force);
        if (rebalance)
          return this.balanced(left, right);
        this.height = this.left.height + this.right.height;
        this.outdated = false;
        return this;
      }
      toString() {
        return this.left + (this.break ? " " : "-") + this.right;
      }
    };
    relevantWidgetHeight = 5;
    NodeBuilder = class {
      constructor(pos, oracle) {
        this.pos = pos;
        this.oracle = oracle;
        this.nodes = [];
        this.lineStart = -1;
        this.lineEnd = -1;
        this.covering = null;
        this.writtenTo = pos;
      }
      get isCovered() {
        return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
      }
      span(_from, to) {
        if (this.lineStart > -1) {
          let end = Math.min(to, this.lineEnd), last = this.nodes[this.nodes.length - 1];
          if (last instanceof HeightMapText)
            last.length += end - this.pos;
          else if (end > this.pos || !this.isCovered)
            this.nodes.push(new HeightMapText(end - this.pos, -1));
          this.writtenTo = end;
          if (to > end) {
            this.nodes.push(null);
            this.writtenTo++;
            this.lineStart = -1;
          }
        }
        this.pos = to;
      }
      point(from, to, deco) {
        if (from < to || deco.heightRelevant) {
          let height = deco.widget ? deco.widget.estimatedHeight : 0;
          if (height < 0)
            height = this.oracle.lineHeight;
          let len = to - from;
          if (deco.block) {
            this.addBlock(new HeightMapBlock(len, height, deco.type));
          } else if (len || height >= relevantWidgetHeight) {
            this.addLineDeco(height, len);
          }
        } else if (to > from) {
          this.span(from, to);
        }
        if (this.lineEnd > -1 && this.lineEnd < this.pos)
          this.lineEnd = this.oracle.doc.lineAt(this.pos).to;
      }
      enterLine() {
        if (this.lineStart > -1)
          return;
        let { from, to } = this.oracle.doc.lineAt(this.pos);
        this.lineStart = from;
        this.lineEnd = to;
        if (this.writtenTo < from) {
          if (this.writtenTo < from - 1 || this.nodes[this.nodes.length - 1] == null)
            this.nodes.push(this.blankContent(this.writtenTo, from - 1));
          this.nodes.push(null);
        }
        if (this.pos > from)
          this.nodes.push(new HeightMapText(this.pos - from, -1));
        this.writtenTo = this.pos;
      }
      blankContent(from, to) {
        let gap = new HeightMapGap(to - from);
        if (this.oracle.doc.lineAt(from).to == to)
          gap.flags |= 4;
        return gap;
      }
      ensureLine() {
        this.enterLine();
        let last = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
        if (last instanceof HeightMapText)
          return last;
        let line = new HeightMapText(0, -1);
        this.nodes.push(line);
        return line;
      }
      addBlock(block) {
        this.enterLine();
        if (block.type == BlockType.WidgetAfter && !this.isCovered)
          this.ensureLine();
        this.nodes.push(block);
        this.writtenTo = this.pos = this.pos + block.length;
        if (block.type != BlockType.WidgetBefore)
          this.covering = block;
      }
      addLineDeco(height, length) {
        let line = this.ensureLine();
        line.length += length;
        line.collapsed += length;
        line.widgetHeight = Math.max(line.widgetHeight, height);
        this.writtenTo = this.pos = this.pos + length;
      }
      finish(from) {
        let last = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
        if (this.lineStart > -1 && !(last instanceof HeightMapText) && !this.isCovered)
          this.nodes.push(new HeightMapText(0, -1));
        else if (this.writtenTo < this.pos || last == null)
          this.nodes.push(this.blankContent(this.writtenTo, this.pos));
        let pos = from;
        for (let node of this.nodes) {
          if (node instanceof HeightMapText)
            node.updateHeight(this.oracle, pos);
          pos += node ? node.length : 1;
        }
        return this.nodes;
      }
      static build(oracle, decorations2, from, to) {
        let builder = new NodeBuilder(from, oracle);
        RangeSet.spans(decorations2, from, to, builder, 0);
        return builder.finish(from);
      }
    };
    DecorationComparator = class {
      constructor() {
        this.changes = [];
      }
      compareRange() {
      }
      comparePoint(from, to, a, b) {
        if (from < to || a && a.heightRelevant || b && b.heightRelevant)
          addRange(from, to, this.changes, 5);
      }
    };
    LineGap = class {
      constructor(from, to, size) {
        this.from = from;
        this.to = to;
        this.size = size;
      }
      static same(a, b) {
        if (a.length != b.length)
          return false;
        for (let i2 = 0; i2 < a.length; i2++) {
          let gA = a[i2], gB = b[i2];
          if (gA.from != gB.from || gA.to != gB.to || gA.size != gB.size)
            return false;
        }
        return true;
      }
      draw(wrapping) {
        return Decoration.replace({ widget: new LineGapWidget(this.size, wrapping) }).range(this.from, this.to);
      }
    };
    LineGapWidget = class extends WidgetType {
      constructor(size, vertical) {
        super();
        this.size = size;
        this.vertical = vertical;
      }
      eq(other) {
        return other.size == this.size && other.vertical == this.vertical;
      }
      toDOM() {
        let elt = document.createElement("div");
        if (this.vertical) {
          elt.style.height = this.size + "px";
        } else {
          elt.style.width = this.size + "px";
          elt.style.height = "2px";
          elt.style.display = "inline-block";
        }
        return elt;
      }
      get estimatedHeight() {
        return this.vertical ? this.size : -1;
      }
    };
    ViewState = class {
      constructor(state) {
        this.state = state;
        this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 };
        this.inView = true;
        this.paddingTop = 0;
        this.paddingBottom = 0;
        this.contentDOMWidth = 0;
        this.contentDOMHeight = 0;
        this.editorHeight = 0;
        this.heightOracle = new HeightOracle();
        this.scaler = IdScaler;
        this.scrollTarget = null;
        this.printing = false;
        this.mustMeasureContent = true;
        this.visibleRanges = [];
        this.mustEnforceCursorAssoc = false;
        this.heightMap = HeightMap.empty().applyChanges(state.facet(decorations), Text.empty, this.heightOracle.setDoc(state.doc), [new ChangedRange(0, 0, 0, state.doc.length)]);
        this.viewport = this.getViewport(0, null);
        this.updateViewportLines();
        this.updateForViewport();
        this.lineGaps = this.ensureLineGaps([]);
        this.lineGapDeco = Decoration.set(this.lineGaps.map((gap) => gap.draw(false)));
        this.computeVisibleRanges();
      }
      updateForViewport() {
        let viewports = [this.viewport], { main } = this.state.selection;
        for (let i2 = 0; i2 <= 1; i2++) {
          let pos = i2 ? main.head : main.anchor;
          if (!viewports.some(({ from, to }) => pos >= from && pos <= to)) {
            let { from, to } = this.lineBlockAt(pos);
            viewports.push(new Viewport(from, to));
          }
        }
        this.viewports = viewports.sort((a, b) => a.from - b.from);
        this.scaler = this.heightMap.height <= 7e6 ? IdScaler : new BigScaler(this.heightOracle.doc, this.heightMap, this.viewports);
      }
      updateViewportLines() {
        this.viewportLines = [];
        this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.state.doc, 0, 0, (block) => {
          this.viewportLines.push(this.scaler.scale == 1 ? block : scaleBlock(block, this.scaler));
        });
      }
      update(update, scrollTarget = null) {
        let prev = this.state;
        this.state = update.state;
        let newDeco = this.state.facet(decorations);
        let contentChanges = update.changedRanges;
        let heightChanges = ChangedRange.extendWithRanges(contentChanges, heightRelevantDecoChanges(update.startState.facet(decorations), newDeco, update ? update.changes : ChangeSet.empty(this.state.doc.length)));
        let prevHeight = this.heightMap.height;
        this.heightMap = this.heightMap.applyChanges(newDeco, prev.doc, this.heightOracle.setDoc(this.state.doc), heightChanges);
        if (this.heightMap.height != prevHeight)
          update.flags |= 2;
        let viewport = heightChanges.length ? this.mapViewport(this.viewport, update.changes) : this.viewport;
        if (scrollTarget && (scrollTarget.range.head < viewport.from || scrollTarget.range.head > viewport.to) || !this.viewportIsAppropriate(viewport))
          viewport = this.getViewport(0, scrollTarget);
        let updateLines = !update.changes.empty || update.flags & 2 || viewport.from != this.viewport.from || viewport.to != this.viewport.to;
        this.viewport = viewport;
        this.updateForViewport();
        if (updateLines)
          this.updateViewportLines();
        if (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3)
          this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, update.changes)));
        update.flags |= this.computeVisibleRanges();
        if (scrollTarget)
          this.scrollTarget = scrollTarget;
        if (!this.mustEnforceCursorAssoc && update.selectionSet && update.view.lineWrapping && update.state.selection.main.empty && update.state.selection.main.assoc)
          this.mustEnforceCursorAssoc = true;
      }
      measure(view) {
        let dom = view.contentDOM, style = window.getComputedStyle(dom);
        let oracle = this.heightOracle;
        let whiteSpace = style.whiteSpace, direction = style.direction == "rtl" ? Direction.RTL : Direction.LTR;
        let refresh = this.heightOracle.mustRefreshForStyle(whiteSpace, direction);
        let measureContent = refresh || this.mustMeasureContent || this.contentDOMHeight != dom.clientHeight;
        let result = 0, bias = 0;
        if (measureContent) {
          this.mustMeasureContent = false;
          this.contentDOMHeight = dom.clientHeight;
          let paddingTop = parseInt(style.paddingTop) || 0, paddingBottom = parseInt(style.paddingBottom) || 0;
          if (this.paddingTop != paddingTop || this.paddingBottom != paddingBottom) {
            result |= 8;
            this.paddingTop = paddingTop;
            this.paddingBottom = paddingBottom;
          }
        }
        let pixelViewport = this.printing ? { top: -1e8, bottom: 1e8, left: -1e8, right: 1e8 } : visiblePixelRange(dom, this.paddingTop);
        let dTop = pixelViewport.top - this.pixelViewport.top, dBottom = pixelViewport.bottom - this.pixelViewport.bottom;
        this.pixelViewport = pixelViewport;
        let inView = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
        if (inView != this.inView) {
          this.inView = inView;
          if (inView)
            measureContent = true;
        }
        if (!this.inView)
          return 0;
        if (measureContent) {
          let lineHeights = view.docView.measureVisibleLineHeights();
          if (oracle.mustRefreshForHeights(lineHeights))
            refresh = true;
          let contentWidth = dom.clientWidth;
          if (refresh || oracle.lineWrapping && Math.abs(contentWidth - this.contentDOMWidth) > oracle.charWidth) {
            let { lineHeight, charWidth } = view.docView.measureTextSize();
            refresh = oracle.refresh(whiteSpace, direction, lineHeight, charWidth, contentWidth / charWidth, lineHeights);
            if (refresh) {
              view.docView.minWidth = 0;
              result |= 8;
            }
          }
          if (this.contentDOMWidth != contentWidth) {
            this.contentDOMWidth = contentWidth;
            result |= 8;
          }
          if (this.editorHeight != view.scrollDOM.clientHeight) {
            this.editorHeight = view.scrollDOM.clientHeight;
            result |= 8;
          }
          if (dTop > 0 && dBottom > 0)
            bias = Math.max(dTop, dBottom);
          else if (dTop < 0 && dBottom < 0)
            bias = Math.min(dTop, dBottom);
          oracle.heightChanged = false;
          this.heightMap = this.heightMap.updateHeight(oracle, 0, refresh, new MeasuredHeights(this.viewport.from, lineHeights));
          if (oracle.heightChanged)
            result |= 2;
        }
        let viewportChange = !this.viewportIsAppropriate(this.viewport, bias) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
        if (viewportChange)
          this.viewport = this.getViewport(bias, this.scrollTarget);
        this.updateForViewport();
        if (result & 2 || viewportChange)
          this.updateViewportLines();
        if (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3)
          this.updateLineGaps(this.ensureLineGaps(refresh ? [] : this.lineGaps));
        result |= this.computeVisibleRanges();
        if (this.mustEnforceCursorAssoc) {
          this.mustEnforceCursorAssoc = false;
          view.docView.enforceCursorAssoc();
        }
        return result;
      }
      get visibleTop() {
        return this.scaler.fromDOM(this.pixelViewport.top);
      }
      get visibleBottom() {
        return this.scaler.fromDOM(this.pixelViewport.bottom);
      }
      getViewport(bias, scrollTarget) {
        let marginTop = 0.5 - Math.max(-0.5, Math.min(0.5, bias / 1e3 / 2));
        let map = this.heightMap, doc2 = this.state.doc, { visibleTop, visibleBottom } = this;
        let viewport = new Viewport(map.lineAt(visibleTop - marginTop * 1e3, QueryType.ByHeight, doc2, 0, 0).from, map.lineAt(visibleBottom + (1 - marginTop) * 1e3, QueryType.ByHeight, doc2, 0, 0).to);
        if (scrollTarget) {
          let { head } = scrollTarget.range, viewHeight = this.editorHeight;
          if (head < viewport.from || head > viewport.to) {
            let block = map.lineAt(head, QueryType.ByPos, doc2, 0, 0), topPos;
            if (scrollTarget.y == "center")
              topPos = (block.top + block.bottom) / 2 - viewHeight / 2;
            else if (scrollTarget.y == "start" || scrollTarget.y == "nearest" && head < viewport.from)
              topPos = block.top;
            else
              topPos = block.bottom - viewHeight;
            viewport = new Viewport(map.lineAt(topPos - 1e3 / 2, QueryType.ByHeight, doc2, 0, 0).from, map.lineAt(topPos + viewHeight + 1e3 / 2, QueryType.ByHeight, doc2, 0, 0).to);
          }
        }
        return viewport;
      }
      mapViewport(viewport, changes) {
        let from = changes.mapPos(viewport.from, -1), to = changes.mapPos(viewport.to, 1);
        return new Viewport(this.heightMap.lineAt(from, QueryType.ByPos, this.state.doc, 0, 0).from, this.heightMap.lineAt(to, QueryType.ByPos, this.state.doc, 0, 0).to);
      }
      viewportIsAppropriate({ from, to }, bias = 0) {
        if (!this.inView)
          return true;
        let { top: top2 } = this.heightMap.lineAt(from, QueryType.ByPos, this.state.doc, 0, 0);
        let { bottom } = this.heightMap.lineAt(to, QueryType.ByPos, this.state.doc, 0, 0);
        let { visibleTop, visibleBottom } = this;
        return (from == 0 || top2 <= visibleTop - Math.max(10, Math.min(-bias, 250))) && (to == this.state.doc.length || bottom >= visibleBottom + Math.max(10, Math.min(bias, 250))) && (top2 > visibleTop - 2 * 1e3 && bottom < visibleBottom + 2 * 1e3);
      }
      mapLineGaps(gaps, changes) {
        if (!gaps.length || changes.empty)
          return gaps;
        let mapped = [];
        for (let gap of gaps)
          if (!changes.touchesRange(gap.from, gap.to))
            mapped.push(new LineGap(changes.mapPos(gap.from), changes.mapPos(gap.to), gap.size));
        return mapped;
      }
      ensureLineGaps(current) {
        let gaps = [];
        if (this.heightOracle.direction != Direction.LTR)
          return gaps;
        for (let line of this.viewportLines) {
          if (line.length < 4e3)
            continue;
          let structure = lineStructure(line.from, line.to, this.state);
          if (structure.total < 4e3)
            continue;
          let viewFrom, viewTo;
          if (this.heightOracle.lineWrapping) {
            let marginHeight = 2e3 / this.heightOracle.lineLength * this.heightOracle.lineHeight;
            viewFrom = findPosition(structure, (this.visibleTop - line.top - marginHeight) / line.height);
            viewTo = findPosition(structure, (this.visibleBottom - line.top + marginHeight) / line.height);
          } else {
            let totalWidth = structure.total * this.heightOracle.charWidth;
            let marginWidth = 2e3 * this.heightOracle.charWidth;
            viewFrom = findPosition(structure, (this.pixelViewport.left - marginWidth) / totalWidth);
            viewTo = findPosition(structure, (this.pixelViewport.right + marginWidth) / totalWidth);
          }
          let outside = [];
          if (viewFrom > line.from)
            outside.push({ from: line.from, to: viewFrom });
          if (viewTo < line.to)
            outside.push({ from: viewTo, to: line.to });
          let sel = this.state.selection.main;
          if (sel.from >= line.from && sel.from <= line.to)
            cutRange(outside, sel.from - 10, sel.from + 10);
          if (!sel.empty && sel.to >= line.from && sel.to <= line.to)
            cutRange(outside, sel.to - 10, sel.to + 10);
          for (let { from, to } of outside)
            if (to - from > 1e3) {
              gaps.push(find(current, (gap) => gap.from >= line.from && gap.to <= line.to && Math.abs(gap.from - from) < 1e3 && Math.abs(gap.to - to) < 1e3) || new LineGap(from, to, this.gapSize(line, from, to, structure)));
            }
        }
        return gaps;
      }
      gapSize(line, from, to, structure) {
        let fraction = findFraction(structure, to) - findFraction(structure, from);
        if (this.heightOracle.lineWrapping) {
          return line.height * fraction;
        } else {
          return structure.total * this.heightOracle.charWidth * fraction;
        }
      }
      updateLineGaps(gaps) {
        if (!LineGap.same(gaps, this.lineGaps)) {
          this.lineGaps = gaps;
          this.lineGapDeco = Decoration.set(gaps.map((gap) => gap.draw(this.heightOracle.lineWrapping)));
        }
      }
      computeVisibleRanges() {
        let deco = this.state.facet(decorations);
        if (this.lineGaps.length)
          deco = deco.concat(this.lineGapDeco);
        let ranges = [];
        RangeSet.spans(deco, this.viewport.from, this.viewport.to, {
          span(from, to) {
            ranges.push({ from, to });
          },
          point() {
          }
        }, 20);
        let changed = ranges.length != this.visibleRanges.length || this.visibleRanges.some((r2, i2) => r2.from != ranges[i2].from || r2.to != ranges[i2].to);
        this.visibleRanges = ranges;
        return changed ? 4 : 0;
      }
      lineBlockAt(pos) {
        return pos >= this.viewport.from && pos <= this.viewport.to && this.viewportLines.find((b) => b.from <= pos && b.to >= pos) || scaleBlock(this.heightMap.lineAt(pos, QueryType.ByPos, this.state.doc, 0, 0), this.scaler);
      }
      lineBlockAtHeight(height) {
        return scaleBlock(this.heightMap.lineAt(this.scaler.fromDOM(height), QueryType.ByHeight, this.state.doc, 0, 0), this.scaler);
      }
      elementAtHeight(height) {
        return scaleBlock(this.heightMap.blockAt(this.scaler.fromDOM(height), this.state.doc, 0, 0), this.scaler);
      }
      get docHeight() {
        return this.scaler.toDOM(this.heightMap.height);
      }
      get contentHeight() {
        return this.docHeight + this.paddingTop + this.paddingBottom;
      }
    };
    Viewport = class {
      constructor(from, to) {
        this.from = from;
        this.to = to;
      }
    };
    IdScaler = {
      toDOM(n) {
        return n;
      },
      fromDOM(n) {
        return n;
      },
      scale: 1
    };
    BigScaler = class {
      constructor(doc2, heightMap, viewports) {
        let vpHeight = 0, base3 = 0, domBase = 0;
        this.viewports = viewports.map(({ from, to }) => {
          let top2 = heightMap.lineAt(from, QueryType.ByPos, doc2, 0, 0).top;
          let bottom = heightMap.lineAt(to, QueryType.ByPos, doc2, 0, 0).bottom;
          vpHeight += bottom - top2;
          return { from, to, top: top2, bottom, domTop: 0, domBottom: 0 };
        });
        this.scale = (7e6 - vpHeight) / (heightMap.height - vpHeight);
        for (let obj of this.viewports) {
          obj.domTop = domBase + (obj.top - base3) * this.scale;
          domBase = obj.domBottom = obj.domTop + (obj.bottom - obj.top);
          base3 = obj.bottom;
        }
      }
      toDOM(n) {
        for (let i2 = 0, base3 = 0, domBase = 0; ; i2++) {
          let vp = i2 < this.viewports.length ? this.viewports[i2] : null;
          if (!vp || n < vp.top)
            return domBase + (n - base3) * this.scale;
          if (n <= vp.bottom)
            return vp.domTop + (n - vp.top);
          base3 = vp.bottom;
          domBase = vp.domBottom;
        }
      }
      fromDOM(n) {
        for (let i2 = 0, base3 = 0, domBase = 0; ; i2++) {
          let vp = i2 < this.viewports.length ? this.viewports[i2] : null;
          if (!vp || n < vp.domTop)
            return base3 + (n - domBase) / this.scale;
          if (n <= vp.domBottom)
            return vp.top + (n - vp.domTop);
          base3 = vp.bottom;
          domBase = vp.domBottom;
        }
      }
    };
    theme = /* @__PURE__ */ Facet.define({ combine: (strs) => strs.join(" ") });
    darkTheme = /* @__PURE__ */ Facet.define({ combine: (values) => values.indexOf(true) > -1 });
    baseThemeID = /* @__PURE__ */ StyleModule.newName();
    baseLightID = /* @__PURE__ */ StyleModule.newName();
    baseDarkID = /* @__PURE__ */ StyleModule.newName();
    lightDarkIDs = { "&light": "." + baseLightID, "&dark": "." + baseDarkID };
    baseTheme = /* @__PURE__ */ buildTheme("." + baseThemeID, {
      "&.cm-editor": {
        position: "relative !important",
        boxSizing: "border-box",
        "&.cm-focused": {
          outline: "1px dotted #212121"
        },
        display: "flex !important",
        flexDirection: "column"
      },
      ".cm-scroller": {
        display: "flex !important",
        alignItems: "flex-start !important",
        fontFamily: "monospace",
        lineHeight: 1.4,
        height: "100%",
        overflowX: "auto",
        position: "relative",
        zIndex: 0
      },
      ".cm-content": {
        margin: 0,
        flexGrow: 2,
        minHeight: "100%",
        display: "block",
        whiteSpace: "pre",
        wordWrap: "normal",
        boxSizing: "border-box",
        padding: "4px 0",
        outline: "none",
        "&[contenteditable=true]": {
          WebkitUserModify: "read-write-plaintext-only"
        }
      },
      ".cm-lineWrapping": {
        whiteSpace_fallback: "pre-wrap",
        whiteSpace: "break-spaces",
        wordBreak: "break-word",
        overflowWrap: "anywhere"
      },
      "&light .cm-content": { caretColor: "black" },
      "&dark .cm-content": { caretColor: "white" },
      ".cm-line": {
        display: "block",
        padding: "0 2px 0 4px"
      },
      ".cm-selectionLayer": {
        zIndex: -1,
        contain: "size style"
      },
      ".cm-selectionBackground": {
        position: "absolute"
      },
      "&light .cm-selectionBackground": {
        background: "#d9d9d9"
      },
      "&dark .cm-selectionBackground": {
        background: "#222"
      },
      "&light.cm-focused .cm-selectionBackground": {
        background: "#d7d4f0"
      },
      "&dark.cm-focused .cm-selectionBackground": {
        background: "#233"
      },
      ".cm-cursorLayer": {
        zIndex: 100,
        contain: "size style",
        pointerEvents: "none"
      },
      "&.cm-focused .cm-cursorLayer": {
        animation: "steps(1) cm-blink 1.2s infinite"
      },
      "@keyframes cm-blink": { "0%": {}, "50%": { visibility: "hidden" }, "100%": {} },
      "@keyframes cm-blink2": { "0%": {}, "50%": { visibility: "hidden" }, "100%": {} },
      ".cm-cursor, .cm-dropCursor": {
        position: "absolute",
        borderLeft: "1.2px solid black",
        marginLeft: "-0.6px",
        pointerEvents: "none"
      },
      ".cm-cursor": {
        display: "none"
      },
      "&dark .cm-cursor": {
        borderLeftColor: "#444"
      },
      "&.cm-focused .cm-cursor": {
        display: "block"
      },
      "&light .cm-activeLine": { backgroundColor: "#f3f9ff" },
      "&dark .cm-activeLine": { backgroundColor: "#223039" },
      "&light .cm-specialChar": { color: "red" },
      "&dark .cm-specialChar": { color: "#f78" },
      ".cm-tab": {
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom"
      },
      ".cm-placeholder": {
        color: "#888",
        display: "inline-block",
        verticalAlign: "top"
      },
      ".cm-button": {
        verticalAlign: "middle",
        color: "inherit",
        fontSize: "70%",
        padding: ".2em 1em",
        borderRadius: "1px"
      },
      "&light .cm-button": {
        backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
        border: "1px solid #888",
        "&:active": {
          backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
        }
      },
      "&dark .cm-button": {
        backgroundImage: "linear-gradient(#393939, #111)",
        border: "1px solid #888",
        "&:active": {
          backgroundImage: "linear-gradient(#111, #333)"
        }
      },
      ".cm-textfield": {
        verticalAlign: "middle",
        color: "inherit",
        fontSize: "70%",
        border: "1px solid silver",
        padding: ".2em .5em"
      },
      "&light .cm-textfield": {
        backgroundColor: "white"
      },
      "&dark .cm-textfield": {
        border: "1px solid #555",
        backgroundColor: "inherit"
      }
    }, lightDarkIDs);
    observeOptions = {
      childList: true,
      characterData: true,
      subtree: true,
      attributes: true,
      characterDataOldValue: true
    };
    useCharData = browser.ie && browser.ie_version <= 11;
    DOMObserver = class {
      constructor(view, onChange, onScrollChanged) {
        this.view = view;
        this.onChange = onChange;
        this.onScrollChanged = onScrollChanged;
        this.active = false;
        this.selectionRange = new DOMSelectionState();
        this.selectionChanged = false;
        this.delayedFlush = -1;
        this.resizeTimeout = -1;
        this.queue = [];
        this.delayedAndroidKey = null;
        this.scrollTargets = [];
        this.intersection = null;
        this.resize = null;
        this.intersecting = false;
        this.gapIntersection = null;
        this.gaps = [];
        this.parentCheck = -1;
        this.dom = view.contentDOM;
        this.observer = new MutationObserver((mutations) => {
          for (let mut of mutations)
            this.queue.push(mut);
          if ((browser.ie && browser.ie_version <= 11 || browser.ios && view.composing) && mutations.some((m2) => m2.type == "childList" && m2.removedNodes.length || m2.type == "characterData" && m2.oldValue.length > m2.target.nodeValue.length))
            this.flushSoon();
          else
            this.flush();
        });
        if (useCharData)
          this.onCharData = (event) => {
            this.queue.push({
              target: event.target,
              type: "characterData",
              oldValue: event.prevValue
            });
            this.flushSoon();
          };
        this.onSelectionChange = this.onSelectionChange.bind(this);
        if (typeof ResizeObserver == "function") {
          this.resize = new ResizeObserver(() => {
            if (this.view.docView.lastUpdate < Date.now() - 75 && this.resizeTimeout < 0)
              this.resizeTimeout = setTimeout(() => {
                this.resizeTimeout = -1;
                this.view.requestMeasure();
              }, 50);
          });
          this.resize.observe(view.scrollDOM);
        }
        this.start();
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onScroll);
        if (typeof IntersectionObserver == "function") {
          this.intersection = new IntersectionObserver((entries) => {
            if (this.parentCheck < 0)
              this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3);
            if (entries.length > 0 && entries[entries.length - 1].intersectionRatio > 0 != this.intersecting) {
              this.intersecting = !this.intersecting;
              if (this.intersecting != this.view.inView)
                this.onScrollChanged(document.createEvent("Event"));
            }
          }, {});
          this.intersection.observe(this.dom);
          this.gapIntersection = new IntersectionObserver((entries) => {
            if (entries.length > 0 && entries[entries.length - 1].intersectionRatio > 0)
              this.onScrollChanged(document.createEvent("Event"));
          }, {});
        }
        this.listenForScroll();
        this.readSelectionRange();
        this.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
      }
      onScroll(e2) {
        if (this.intersecting)
          this.flush(false);
        this.onScrollChanged(e2);
      }
      updateGaps(gaps) {
        if (this.gapIntersection && (gaps.length != this.gaps.length || this.gaps.some((g, i2) => g != gaps[i2]))) {
          this.gapIntersection.disconnect();
          for (let gap of gaps)
            this.gapIntersection.observe(gap);
          this.gaps = gaps;
        }
      }
      onSelectionChange(event) {
        if (!this.readSelectionRange() || this.delayedAndroidKey)
          return;
        let { view } = this, sel = this.selectionRange;
        if (view.state.facet(editable) ? view.root.activeElement != this.dom : !hasSelection(view.dom, sel))
          return;
        let context = sel.anchorNode && view.docView.nearest(sel.anchorNode);
        if (context && context.ignoreEvent(event))
          return;
        if ((browser.ie && browser.ie_version <= 11 || browser.android && browser.chrome) && !view.state.selection.main.empty && sel.focusNode && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset))
          this.flushSoon();
        else
          this.flush(false);
      }
      readSelectionRange() {
        let { root } = this.view, domSel = getSelection(root);
        let range2 = browser.safari && root.nodeType == 11 && deepActiveElement() == this.view.contentDOM && safariSelectionRangeHack(this.view) || domSel;
        if (this.selectionRange.eq(range2))
          return false;
        this.selectionRange.setRange(range2);
        return this.selectionChanged = true;
      }
      setSelectionRange(anchor, head) {
        this.selectionRange.set(anchor.node, anchor.offset, head.node, head.offset);
        this.selectionChanged = false;
      }
      listenForScroll() {
        this.parentCheck = -1;
        let i2 = 0, changed = null;
        for (let dom = this.dom; dom; ) {
          if (dom.nodeType == 1) {
            if (!changed && i2 < this.scrollTargets.length && this.scrollTargets[i2] == dom)
              i2++;
            else if (!changed)
              changed = this.scrollTargets.slice(0, i2);
            if (changed)
              changed.push(dom);
            dom = dom.assignedSlot || dom.parentNode;
          } else if (dom.nodeType == 11) {
            dom = dom.host;
          } else {
            break;
          }
        }
        if (i2 < this.scrollTargets.length && !changed)
          changed = this.scrollTargets.slice(0, i2);
        if (changed) {
          for (let dom of this.scrollTargets)
            dom.removeEventListener("scroll", this.onScroll);
          for (let dom of this.scrollTargets = changed)
            dom.addEventListener("scroll", this.onScroll);
        }
      }
      ignore(f3) {
        if (!this.active)
          return f3();
        try {
          this.stop();
          return f3();
        } finally {
          this.start();
          this.clear();
        }
      }
      start() {
        if (this.active)
          return;
        this.observer.observe(this.dom, observeOptions);
        if (useCharData)
          this.dom.addEventListener("DOMCharacterDataModified", this.onCharData);
        this.active = true;
      }
      stop() {
        if (!this.active)
          return;
        this.active = false;
        this.observer.disconnect();
        if (useCharData)
          this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData);
      }
      clear() {
        this.observer.takeRecords();
        this.queue.length = 0;
        this.selectionChanged = false;
      }
      delayAndroidKey(key, keyCode) {
        if (!this.delayedAndroidKey)
          requestAnimationFrame(() => {
            let key2 = this.delayedAndroidKey;
            this.delayedAndroidKey = null;
            let startState = this.view.state;
            if (dispatchKey(this.view.contentDOM, key2.key, key2.keyCode))
              this.processRecords();
            else
              this.flush();
            if (this.view.state == startState)
              this.view.update([]);
          });
        if (!this.delayedAndroidKey || key == "Enter")
          this.delayedAndroidKey = { key, keyCode };
      }
      flushSoon() {
        if (this.delayedFlush < 0)
          this.delayedFlush = window.setTimeout(() => {
            this.delayedFlush = -1;
            this.flush();
          }, 20);
      }
      forceFlush() {
        if (this.delayedFlush >= 0) {
          window.clearTimeout(this.delayedFlush);
          this.delayedFlush = -1;
          this.flush();
        }
      }
      processRecords() {
        let records = this.queue;
        for (let mut of this.observer.takeRecords())
          records.push(mut);
        if (records.length)
          this.queue = [];
        let from = -1, to = -1, typeOver = false;
        for (let record of records) {
          let range2 = this.readMutation(record);
          if (!range2)
            continue;
          if (range2.typeOver)
            typeOver = true;
          if (from == -1) {
            ({ from, to } = range2);
          } else {
            from = Math.min(range2.from, from);
            to = Math.max(range2.to, to);
          }
        }
        return { from, to, typeOver };
      }
      flush(readSelection = true) {
        if (this.delayedFlush >= 0 || this.delayedAndroidKey)
          return;
        if (readSelection)
          this.readSelectionRange();
        let { from, to, typeOver } = this.processRecords();
        let newSel = this.selectionChanged && hasSelection(this.dom, this.selectionRange);
        if (from < 0 && !newSel)
          return;
        this.selectionChanged = false;
        let startState = this.view.state;
        this.onChange(from, to, typeOver);
        if (this.view.state == startState)
          this.view.update([]);
      }
      readMutation(rec) {
        let cView = this.view.docView.nearest(rec.target);
        if (!cView || cView.ignoreMutation(rec))
          return null;
        cView.markDirty(rec.type == "attributes");
        if (rec.type == "attributes")
          cView.dirty |= 4;
        if (rec.type == "childList") {
          let childBefore = findChild(cView, rec.previousSibling || rec.target.previousSibling, -1);
          let childAfter = findChild(cView, rec.nextSibling || rec.target.nextSibling, 1);
          return {
            from: childBefore ? cView.posAfter(childBefore) : cView.posAtStart,
            to: childAfter ? cView.posBefore(childAfter) : cView.posAtEnd,
            typeOver: false
          };
        } else if (rec.type == "characterData") {
          return { from: cView.posAtStart, to: cView.posAtEnd, typeOver: rec.target.nodeValue == rec.oldValue };
        } else {
          return null;
        }
      }
      destroy() {
        var _a, _b, _c;
        this.stop();
        (_a = this.intersection) === null || _a === void 0 ? void 0 : _a.disconnect();
        (_b = this.gapIntersection) === null || _b === void 0 ? void 0 : _b.disconnect();
        (_c = this.resize) === null || _c === void 0 ? void 0 : _c.disconnect();
        for (let dom of this.scrollTargets)
          dom.removeEventListener("scroll", this.onScroll);
        window.removeEventListener("scroll", this.onScroll);
        this.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
        clearTimeout(this.parentCheck);
        clearTimeout(this.resizeTimeout);
      }
    };
    EditorView = class {
      constructor(config = {}) {
        this.plugins = [];
        this.pluginMap = new Map();
        this.editorAttrs = {};
        this.contentAttrs = {};
        this.bidiCache = [];
        this.destroyed = false;
        this.updateState = 2;
        this.measureScheduled = -1;
        this.measureRequests = [];
        this.contentDOM = document.createElement("div");
        this.scrollDOM = document.createElement("div");
        this.scrollDOM.tabIndex = -1;
        this.scrollDOM.className = "cm-scroller";
        this.scrollDOM.appendChild(this.contentDOM);
        this.announceDOM = document.createElement("div");
        this.announceDOM.style.cssText = "position: absolute; top: -10000px";
        this.announceDOM.setAttribute("aria-live", "polite");
        this.dom = document.createElement("div");
        this.dom.appendChild(this.announceDOM);
        this.dom.appendChild(this.scrollDOM);
        this._dispatch = config.dispatch || ((tr) => this.update([tr]));
        this.dispatch = this.dispatch.bind(this);
        this.root = config.root || getRoot(config.parent) || document;
        this.viewState = new ViewState(config.state || EditorState.create());
        this.plugins = this.state.facet(viewPlugin).map((spec) => new PluginInstance(spec));
        for (let plugin of this.plugins)
          plugin.update(this);
        this.observer = new DOMObserver(this, (from, to, typeOver) => {
          applyDOMChange(this, from, to, typeOver);
        }, (event) => {
          this.inputState.runScrollHandlers(this, event);
          if (this.observer.intersecting)
            this.measure();
        });
        this.inputState = new InputState(this);
        this.docView = new DocView(this);
        this.mountStyles();
        this.updateAttrs();
        this.updateState = 0;
        ensureGlobalHandler();
        this.requestMeasure();
        if (config.parent)
          config.parent.appendChild(this.dom);
      }
      get state() {
        return this.viewState.state;
      }
      get viewport() {
        return this.viewState.viewport;
      }
      get visibleRanges() {
        return this.viewState.visibleRanges;
      }
      get inView() {
        return this.viewState.inView;
      }
      get composing() {
        return this.inputState.composing > 0;
      }
      dispatch(...input) {
        this._dispatch(input.length == 1 && input[0] instanceof Transaction ? input[0] : this.state.update(...input));
      }
      update(transactions) {
        if (this.updateState != 0)
          throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
        let redrawn = false, update;
        let state = this.state;
        for (let tr of transactions) {
          if (tr.startState != state)
            throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
          state = tr.state;
        }
        if (this.destroyed) {
          this.viewState.state = state;
          return;
        }
        if (state.facet(EditorState.phrases) != this.state.facet(EditorState.phrases))
          return this.setState(state);
        update = new ViewUpdate(this, state, transactions);
        let scrollTarget = null;
        try {
          this.updateState = 2;
          for (let tr of transactions) {
            if (scrollTarget)
              scrollTarget = scrollTarget.map(tr.changes);
            if (tr.scrollIntoView) {
              let { main } = tr.state.selection;
              scrollTarget = new ScrollTarget(main.empty ? main : EditorSelection.cursor(main.head, main.head > main.anchor ? -1 : 1));
            }
            for (let e2 of tr.effects) {
              if (e2.is(scrollTo))
                scrollTarget = new ScrollTarget(e2.value);
              else if (e2.is(centerOn))
                scrollTarget = new ScrollTarget(e2.value, "center");
              else if (e2.is(scrollIntoView))
                scrollTarget = e2.value;
            }
          }
          this.viewState.update(update, scrollTarget);
          this.bidiCache = CachedOrder.update(this.bidiCache, update.changes);
          if (!update.empty) {
            this.updatePlugins(update);
            this.inputState.update(update);
          }
          redrawn = this.docView.update(update);
          if (this.state.facet(styleModule) != this.styleModules)
            this.mountStyles();
          this.updateAttrs();
          this.showAnnouncements(transactions);
          this.docView.updateSelection(redrawn, transactions.some((tr) => tr.isUserEvent("select.pointer")));
        } finally {
          this.updateState = 0;
        }
        if (redrawn || scrollTarget || this.viewState.mustEnforceCursorAssoc)
          this.requestMeasure();
        if (!update.empty)
          for (let listener of this.state.facet(updateListener))
            listener(update);
      }
      setState(newState) {
        if (this.updateState != 0)
          throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
        if (this.destroyed) {
          this.viewState.state = newState;
          return;
        }
        this.updateState = 2;
        try {
          for (let plugin of this.plugins)
            plugin.destroy(this);
          this.viewState = new ViewState(newState);
          this.plugins = newState.facet(viewPlugin).map((spec) => new PluginInstance(spec));
          this.pluginMap.clear();
          for (let plugin of this.plugins)
            plugin.update(this);
          this.docView = new DocView(this);
          this.inputState.ensureHandlers(this);
          this.mountStyles();
          this.updateAttrs();
          this.bidiCache = [];
        } finally {
          this.updateState = 0;
        }
        this.requestMeasure();
      }
      updatePlugins(update) {
        let prevSpecs = update.startState.facet(viewPlugin), specs = update.state.facet(viewPlugin);
        if (prevSpecs != specs) {
          let newPlugins = [];
          for (let spec of specs) {
            let found = prevSpecs.indexOf(spec);
            if (found < 0) {
              newPlugins.push(new PluginInstance(spec));
            } else {
              let plugin = this.plugins[found];
              plugin.mustUpdate = update;
              newPlugins.push(plugin);
            }
          }
          for (let plugin of this.plugins)
            if (plugin.mustUpdate != update)
              plugin.destroy(this);
          this.plugins = newPlugins;
          this.pluginMap.clear();
          this.inputState.ensureHandlers(this);
        } else {
          for (let p of this.plugins)
            p.mustUpdate = update;
        }
        for (let i2 = 0; i2 < this.plugins.length; i2++)
          this.plugins[i2].update(this);
      }
      measure(flush = true) {
        if (this.destroyed)
          return;
        if (this.measureScheduled > -1)
          cancelAnimationFrame(this.measureScheduled);
        this.measureScheduled = 0;
        if (flush)
          this.observer.flush();
        let updated = null;
        try {
          for (let i2 = 0; ; i2++) {
            this.updateState = 1;
            let oldViewport = this.viewport;
            let changed = this.viewState.measure(this);
            if (!changed && !this.measureRequests.length && this.viewState.scrollTarget == null)
              break;
            if (i2 > 5) {
              console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
              break;
            }
            let measuring = [];
            if (!(changed & 4))
              [this.measureRequests, measuring] = [measuring, this.measureRequests];
            let measured = measuring.map((m2) => {
              try {
                return m2.read(this);
              } catch (e2) {
                logException(this.state, e2);
                return BadMeasure;
              }
            });
            let update = new ViewUpdate(this, this.state), redrawn = false;
            update.flags |= changed;
            if (!updated)
              updated = update;
            else
              updated.flags |= changed;
            this.updateState = 2;
            if (!update.empty) {
              this.updatePlugins(update);
              this.inputState.update(update);
              this.updateAttrs();
              redrawn = this.docView.update(update);
            }
            for (let i3 = 0; i3 < measuring.length; i3++)
              if (measured[i3] != BadMeasure) {
                try {
                  let m2 = measuring[i3];
                  if (m2.write)
                    m2.write(measured[i3], this);
                } catch (e2) {
                  logException(this.state, e2);
                }
              }
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget);
              this.viewState.scrollTarget = null;
            }
            if (redrawn)
              this.docView.updateSelection(true);
            if (this.viewport.from == oldViewport.from && this.viewport.to == oldViewport.to && this.measureRequests.length == 0)
              break;
          }
        } finally {
          this.updateState = 0;
          this.measureScheduled = -1;
        }
        if (updated && !updated.empty)
          for (let listener of this.state.facet(updateListener))
            listener(updated);
      }
      get themeClasses() {
        return baseThemeID + " " + (this.state.facet(darkTheme) ? baseDarkID : baseLightID) + " " + this.state.facet(theme);
      }
      updateAttrs() {
        let editorAttrs = attrsFromFacet(this, editorAttributes, {
          class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
        });
        let contentAttrs = {
          spellcheck: "false",
          autocorrect: "off",
          autocapitalize: "off",
          translate: "no",
          contenteditable: !this.state.facet(editable) ? "false" : "true",
          class: "cm-content",
          style: `${browser.tabSize}: ${this.state.tabSize}`,
          role: "textbox",
          "aria-multiline": "true"
        };
        if (this.state.readOnly)
          contentAttrs["aria-readonly"] = "true";
        attrsFromFacet(this, contentAttributes, contentAttrs);
        this.observer.ignore(() => {
          updateAttrs(this.contentDOM, this.contentAttrs, contentAttrs);
          updateAttrs(this.dom, this.editorAttrs, editorAttrs);
        });
        this.editorAttrs = editorAttrs;
        this.contentAttrs = contentAttrs;
      }
      showAnnouncements(trs) {
        let first = true;
        for (let tr of trs)
          for (let effect of tr.effects)
            if (effect.is(EditorView.announce)) {
              if (first)
                this.announceDOM.textContent = "";
              first = false;
              let div = this.announceDOM.appendChild(document.createElement("div"));
              div.textContent = effect.value;
            }
      }
      mountStyles() {
        this.styleModules = this.state.facet(styleModule);
        StyleModule.mount(this.root, this.styleModules.concat(baseTheme).reverse());
      }
      readMeasured() {
        if (this.updateState == 2)
          throw new Error("Reading the editor layout isn't allowed during an update");
        if (this.updateState == 0 && this.measureScheduled > -1)
          this.measure(false);
      }
      requestMeasure(request) {
        if (this.measureScheduled < 0)
          this.measureScheduled = requestAnimationFrame(() => this.measure());
        if (request) {
          if (request.key != null)
            for (let i2 = 0; i2 < this.measureRequests.length; i2++) {
              if (this.measureRequests[i2].key === request.key) {
                this.measureRequests[i2] = request;
                return;
              }
            }
          this.measureRequests.push(request);
        }
      }
      pluginField(field) {
        let result = [];
        for (let plugin of this.plugins)
          plugin.update(this).takeField(field, result);
        return result;
      }
      plugin(plugin) {
        let known = this.pluginMap.get(plugin);
        if (known === void 0 || known && known.spec != plugin)
          this.pluginMap.set(plugin, known = this.plugins.find((p) => p.spec == plugin) || null);
        return known && known.update(this).value;
      }
      get documentTop() {
        return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
      }
      get documentPadding() {
        return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
      }
      blockAtHeight(height, docTop) {
        let top2 = ensureTop(docTop, this);
        return this.elementAtHeight(height - top2).moveY(top2);
      }
      elementAtHeight(height) {
        this.readMeasured();
        return this.viewState.elementAtHeight(height);
      }
      visualLineAtHeight(height, docTop) {
        let top2 = ensureTop(docTop, this);
        return this.lineBlockAtHeight(height - top2).moveY(top2);
      }
      lineBlockAtHeight(height) {
        this.readMeasured();
        return this.viewState.lineBlockAtHeight(height);
      }
      viewportLines(f3, docTop) {
        let top2 = ensureTop(docTop, this);
        for (let line of this.viewportLineBlocks)
          f3(line.moveY(top2));
      }
      get viewportLineBlocks() {
        return this.viewState.viewportLines;
      }
      visualLineAt(pos, docTop = 0) {
        return this.lineBlockAt(pos).moveY(docTop + this.viewState.paddingTop);
      }
      lineBlockAt(pos) {
        return this.viewState.lineBlockAt(pos);
      }
      get contentHeight() {
        return this.viewState.contentHeight;
      }
      moveByChar(start, forward, by) {
        return skipAtoms(this, start, moveByChar(this, start, forward, by));
      }
      moveByGroup(start, forward) {
        return skipAtoms(this, start, moveByChar(this, start, forward, (initial) => byGroup(this, start.head, initial)));
      }
      moveToLineBoundary(start, forward, includeWrap = true) {
        return moveToLineBoundary(this, start, forward, includeWrap);
      }
      moveVertically(start, forward, distance) {
        return skipAtoms(this, start, moveVertically(this, start, forward, distance));
      }
      scrollPosIntoView(pos) {
        this.dispatch({ effects: scrollTo.of(EditorSelection.cursor(pos)) });
      }
      domAtPos(pos) {
        return this.docView.domAtPos(pos);
      }
      posAtDOM(node, offset = 0) {
        return this.docView.posFromDOM(node, offset);
      }
      posAtCoords(coords, precise = true) {
        this.readMeasured();
        return posAtCoords(this, coords, precise);
      }
      coordsAtPos(pos, side = 1) {
        this.readMeasured();
        let rect = this.docView.coordsAt(pos, side);
        if (!rect || rect.left == rect.right)
          return rect;
        let line = this.state.doc.lineAt(pos), order = this.bidiSpans(line);
        let span = order[BidiSpan.find(order, pos - line.from, -1, side)];
        return flattenRect(rect, span.dir == Direction.LTR == side > 0);
      }
      get defaultCharacterWidth() {
        return this.viewState.heightOracle.charWidth;
      }
      get defaultLineHeight() {
        return this.viewState.heightOracle.lineHeight;
      }
      get textDirection() {
        return this.viewState.heightOracle.direction;
      }
      get lineWrapping() {
        return this.viewState.heightOracle.lineWrapping;
      }
      bidiSpans(line) {
        if (line.length > MaxBidiLine)
          return trivialOrder(line.length);
        let dir = this.textDirection;
        for (let entry of this.bidiCache)
          if (entry.from == line.from && entry.dir == dir)
            return entry.order;
        let order = computeOrder(line.text, this.textDirection);
        this.bidiCache.push(new CachedOrder(line.from, line.to, dir, order));
        return order;
      }
      get hasFocus() {
        var _a;
        return (document.hasFocus() || browser.safari && ((_a = this.inputState) === null || _a === void 0 ? void 0 : _a.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
      }
      focus() {
        this.observer.ignore(() => {
          focusPreventScroll(this.contentDOM);
          this.docView.updateSelection();
        });
      }
      destroy() {
        for (let plugin of this.plugins)
          plugin.destroy(this);
        this.plugins = [];
        this.inputState.destroy();
        this.dom.remove();
        this.observer.destroy();
        if (this.measureScheduled > -1)
          cancelAnimationFrame(this.measureScheduled);
        this.destroyed = true;
      }
      static scrollIntoView(pos, options2 = {}) {
        return scrollIntoView.of(new ScrollTarget(typeof pos == "number" ? EditorSelection.cursor(pos) : pos, options2.y, options2.x, options2.yMargin, options2.xMargin));
      }
      static domEventHandlers(handlers2) {
        return ViewPlugin.define(() => ({}), { eventHandlers: handlers2 });
      }
      static theme(spec, options2) {
        let prefix = StyleModule.newName();
        let result = [theme.of(prefix), styleModule.of(buildTheme(`.${prefix}`, spec))];
        if (options2 && options2.dark)
          result.push(darkTheme.of(true));
        return result;
      }
      static baseTheme(spec) {
        return Prec.lowest(styleModule.of(buildTheme("." + baseThemeID, spec, lightDarkIDs)));
      }
    };
    EditorView.scrollTo = scrollTo;
    EditorView.centerOn = centerOn;
    EditorView.styleModule = styleModule;
    EditorView.inputHandler = inputHandler;
    EditorView.exceptionSink = exceptionSink;
    EditorView.updateListener = updateListener;
    EditorView.editable = editable;
    EditorView.mouseSelectionStyle = mouseSelectionStyle;
    EditorView.dragMovesSelection = dragMovesSelection$1;
    EditorView.clickAddsSelectionRange = clickAddsSelectionRange;
    EditorView.decorations = decorations;
    EditorView.contentAttributes = contentAttributes;
    EditorView.editorAttributes = editorAttributes;
    EditorView.lineWrapping = /* @__PURE__ */ EditorView.contentAttributes.of({ "class": "cm-lineWrapping" });
    EditorView.announce = /* @__PURE__ */ StateEffect.define();
    MaxBidiLine = 4096;
    resizeDebounce = -1;
    BadMeasure = {};
    CachedOrder = class {
      constructor(from, to, dir, order) {
        this.from = from;
        this.to = to;
        this.dir = dir;
        this.order = order;
      }
      static update(cache, changes) {
        if (changes.empty)
          return cache;
        let result = [], lastDir = cache.length ? cache[cache.length - 1].dir : Direction.LTR;
        for (let i2 = Math.max(0, cache.length - 10); i2 < cache.length; i2++) {
          let entry = cache[i2];
          if (entry.dir == lastDir && !changes.touchesRange(entry.from, entry.to))
            result.push(new CachedOrder(changes.mapPos(entry.from, 1), changes.mapPos(entry.to, -1), entry.dir, entry.order));
        }
        return result;
      }
    };
    currentPlatform = browser.mac ? "mac" : browser.windows ? "win" : browser.linux ? "linux" : "key";
    handleKeyEvents = /* @__PURE__ */ EditorView.domEventHandlers({
      keydown(event, view) {
        return runHandlers(getKeymap(view.state), event, view, "editor");
      }
    });
    keymap = /* @__PURE__ */ Facet.define({ enables: handleKeyEvents });
    Keymaps = /* @__PURE__ */ new WeakMap();
    storedPrefix = null;
    PrefixTimeout = 4e3;
    CanHidePrimary = !browser.ios;
    themeSpec = {
      ".cm-line": {
        "& ::selection": { backgroundColor: "transparent !important" },
        "&::selection": { backgroundColor: "transparent !important" }
      }
    };
    if (CanHidePrimary)
      themeSpec[".cm-line"].caretColor = "transparent !important";
    UnicodeRegexpSupport = /x/.unicode != null ? "gu" : "g";
  }
});

// node_modules/@lezer/common/dist/index.js
function checkSide(side, pos, from, to) {
  switch (side) {
    case -2:
      return from < pos;
    case -1:
      return to >= pos && from < pos;
    case 0:
      return from < pos && to > pos;
    case 1:
      return from <= pos && to > pos;
    case 2:
      return to > pos;
    case 4:
      return true;
  }
}
function enterUnfinishedNodesBefore(node, pos) {
  let scan = node.childBefore(pos);
  while (scan) {
    let last = scan.lastChild;
    if (!last || last.to != scan.to)
      break;
    if (last.type.isError && last.from == last.to) {
      node = scan;
      scan = last.prevSibling;
    } else {
      scan = last;
    }
  }
  return node;
}
function resolveNode(node, pos, side, overlays) {
  var _a;
  while (node.from == node.to || (side < 1 ? node.from >= pos : node.from > pos) || (side > -1 ? node.to <= pos : node.to < pos)) {
    let parent = !overlays && node instanceof TreeNode && node.index < 0 ? null : node.parent;
    if (!parent)
      return node;
    node = parent;
  }
  if (overlays)
    for (let scan = node, parent = scan.parent; parent; scan = parent, parent = scan.parent) {
      if (scan instanceof TreeNode && scan.index < 0 && ((_a = parent.enter(pos, side, true)) === null || _a === void 0 ? void 0 : _a.from) != scan.from)
        node = parent;
    }
  for (; ; ) {
    let inner = node.enter(pos, side, overlays);
    if (!inner)
      return node;
    node = inner;
  }
}
function getChildren(node, type, before, after) {
  let cur = node.cursor, result = [];
  if (!cur.firstChild())
    return result;
  if (before != null) {
    while (!cur.type.is(before))
      if (!cur.nextSibling())
        return result;
  }
  for (; ; ) {
    if (after != null && cur.type.is(after))
      return result;
    if (cur.type.is(type))
      result.push(cur.node);
    if (!cur.nextSibling())
      return after == null ? result : [];
  }
}
function hasChild(tree) {
  return tree.children.some((ch) => ch instanceof TreeBuffer || !ch.type.isAnonymous || hasChild(ch));
}
function buildTree(data) {
  var _a;
  let { buffer, nodeSet, maxBufferLength = DefaultBufferLength, reused = [], minRepeatType = nodeSet.types.length } = data;
  let cursor = Array.isArray(buffer) ? new FlatBufferCursor(buffer, buffer.length) : buffer;
  let types3 = nodeSet.types;
  let contextHash = 0, lookAhead = 0;
  function takeNode(parentStart, minPos, children2, positions2, inRepeat) {
    let { id: id2, start, end, size } = cursor;
    let lookAheadAtStart = lookAhead;
    while (size < 0) {
      cursor.next();
      if (size == -1) {
        let node2 = reused[id2];
        children2.push(node2);
        positions2.push(start - parentStart);
        return;
      } else if (size == -3) {
        contextHash = id2;
        return;
      } else if (size == -4) {
        lookAhead = id2;
        return;
      } else {
        throw new RangeError(`Unrecognized record size: ${size}`);
      }
    }
    let type = types3[id2], node, buffer2;
    let startPos = start - parentStart;
    if (end - start <= maxBufferLength && (buffer2 = findBufferSize(cursor.pos - minPos, inRepeat))) {
      let data2 = new Uint16Array(buffer2.size - buffer2.skip);
      let endPos = cursor.pos - buffer2.size, index2 = data2.length;
      while (cursor.pos > endPos)
        index2 = copyToBuffer(buffer2.start, data2, index2);
      node = new TreeBuffer(data2, end - buffer2.start, nodeSet);
      startPos = buffer2.start - parentStart;
    } else {
      let endPos = cursor.pos - size;
      cursor.next();
      let localChildren = [], localPositions = [];
      let localInRepeat = id2 >= minRepeatType ? id2 : -1;
      let lastGroup = 0, lastEnd = end;
      while (cursor.pos > endPos) {
        if (localInRepeat >= 0 && cursor.id == localInRepeat && cursor.size >= 0) {
          if (cursor.end <= lastEnd - maxBufferLength) {
            makeRepeatLeaf(localChildren, localPositions, start, lastGroup, cursor.end, lastEnd, localInRepeat, lookAheadAtStart);
            lastGroup = localChildren.length;
            lastEnd = cursor.end;
          }
          cursor.next();
        } else {
          takeNode(start, endPos, localChildren, localPositions, localInRepeat);
        }
      }
      if (localInRepeat >= 0 && lastGroup > 0 && lastGroup < localChildren.length)
        makeRepeatLeaf(localChildren, localPositions, start, lastGroup, start, lastEnd, localInRepeat, lookAheadAtStart);
      localChildren.reverse();
      localPositions.reverse();
      if (localInRepeat > -1 && lastGroup > 0) {
        let make = makeBalanced(type);
        node = balanceRange(type, localChildren, localPositions, 0, localChildren.length, 0, end - start, make, make);
      } else {
        node = makeTree(type, localChildren, localPositions, end - start, lookAheadAtStart - end);
      }
    }
    children2.push(node);
    positions2.push(startPos);
  }
  function makeBalanced(type) {
    return (children2, positions2, length2) => {
      let lookAhead2 = 0, lastI = children2.length - 1, last, lookAheadProp;
      if (lastI >= 0 && (last = children2[lastI]) instanceof Tree) {
        if (!lastI && last.type == type && last.length == length2)
          return last;
        if (lookAheadProp = last.prop(NodeProp.lookAhead))
          lookAhead2 = positions2[lastI] + last.length + lookAheadProp;
      }
      return makeTree(type, children2, positions2, length2, lookAhead2);
    };
  }
  function makeRepeatLeaf(children2, positions2, base3, i2, from, to, type, lookAhead2) {
    let localChildren = [], localPositions = [];
    while (children2.length > i2) {
      localChildren.push(children2.pop());
      localPositions.push(positions2.pop() + base3 - from);
    }
    children2.push(makeTree(nodeSet.types[type], localChildren, localPositions, to - from, lookAhead2 - to));
    positions2.push(from - base3);
  }
  function makeTree(type, children2, positions2, length2, lookAhead2 = 0, props) {
    if (contextHash) {
      let pair2 = [NodeProp.contextHash, contextHash];
      props = props ? [pair2].concat(props) : [pair2];
    }
    if (lookAhead2 > 25) {
      let pair2 = [NodeProp.lookAhead, lookAhead2];
      props = props ? [pair2].concat(props) : [pair2];
    }
    return new Tree(type, children2, positions2, length2, props);
  }
  function findBufferSize(maxSize, inRepeat) {
    let fork = cursor.fork();
    let size = 0, start = 0, skip = 0, minStart = fork.end - maxBufferLength;
    let result = { size: 0, start: 0, skip: 0 };
    scan:
      for (let minPos = fork.pos - maxSize; fork.pos > minPos; ) {
        let nodeSize2 = fork.size;
        if (fork.id == inRepeat && nodeSize2 >= 0) {
          result.size = size;
          result.start = start;
          result.skip = skip;
          skip += 4;
          size += 4;
          fork.next();
          continue;
        }
        let startPos = fork.pos - nodeSize2;
        if (nodeSize2 < 0 || startPos < minPos || fork.start < minStart)
          break;
        let localSkipped = fork.id >= minRepeatType ? 4 : 0;
        let nodeStart = fork.start;
        fork.next();
        while (fork.pos > startPos) {
          if (fork.size < 0) {
            if (fork.size == -3)
              localSkipped += 4;
            else
              break scan;
          } else if (fork.id >= minRepeatType) {
            localSkipped += 4;
          }
          fork.next();
        }
        start = nodeStart;
        size += nodeSize2;
        skip += localSkipped;
      }
    if (inRepeat < 0 || size == maxSize) {
      result.size = size;
      result.start = start;
      result.skip = skip;
    }
    return result.size > 4 ? result : void 0;
  }
  function copyToBuffer(bufferStart, buffer2, index2) {
    let { id: id2, start, end, size } = cursor;
    cursor.next();
    if (size >= 0 && id2 < minRepeatType) {
      let startIndex = index2;
      if (size > 4) {
        let endPos = cursor.pos - (size - 4);
        while (cursor.pos > endPos)
          index2 = copyToBuffer(bufferStart, buffer2, index2);
      }
      buffer2[--index2] = startIndex;
      buffer2[--index2] = end - bufferStart;
      buffer2[--index2] = start - bufferStart;
      buffer2[--index2] = id2;
    } else if (size == -3) {
      contextHash = id2;
    } else if (size == -4) {
      lookAhead = id2;
    }
    return index2;
  }
  let children = [], positions = [];
  while (cursor.pos > 0)
    takeNode(data.start || 0, data.bufferStart || 0, children, positions, -1);
  let length = (_a = data.length) !== null && _a !== void 0 ? _a : children.length ? positions[0] + children[0].length : 0;
  return new Tree(types3[data.topID], children.reverse(), positions.reverse(), length);
}
function nodeSize(balanceType, node) {
  if (!balanceType.isAnonymous || node instanceof TreeBuffer || node.type != balanceType)
    return 1;
  let size = nodeSizeCache.get(node);
  if (size == null) {
    size = 1;
    for (let child of node.children) {
      if (child.type != balanceType || !(child instanceof Tree)) {
        size = 1;
        break;
      }
      size += nodeSize(balanceType, child);
    }
    nodeSizeCache.set(node, size);
  }
  return size;
}
function balanceRange(balanceType, children, positions, from, to, start, length, mkTop, mkTree) {
  let total = 0;
  for (let i2 = from; i2 < to; i2++)
    total += nodeSize(balanceType, children[i2]);
  let maxChild = Math.ceil(total * 1.5 / 8);
  let localChildren = [], localPositions = [];
  function divide(children2, positions2, from2, to2, offset) {
    for (let i2 = from2; i2 < to2; ) {
      let groupFrom = i2, groupStart = positions2[i2], groupSize = nodeSize(balanceType, children2[i2]);
      i2++;
      for (; i2 < to2; i2++) {
        let nextSize = nodeSize(balanceType, children2[i2]);
        if (groupSize + nextSize >= maxChild)
          break;
        groupSize += nextSize;
      }
      if (i2 == groupFrom + 1) {
        if (groupSize > maxChild) {
          let only = children2[groupFrom];
          divide(only.children, only.positions, 0, only.children.length, positions2[groupFrom] + offset);
          continue;
        }
        localChildren.push(children2[groupFrom]);
      } else {
        let length2 = positions2[i2 - 1] + children2[i2 - 1].length - groupStart;
        localChildren.push(balanceRange(balanceType, children2, positions2, groupFrom, i2, groupStart, length2, null, mkTree));
      }
      localPositions.push(groupStart + offset - start);
    }
  }
  divide(children, positions, from, to, 0);
  return (mkTop || mkTree)(localChildren, localPositions, length);
}
var DefaultBufferLength, nextPropID, Range2, NodeProp, noProps, NodeType, NodeSet, CachedNode, CachedInnerNode, Tree, FlatBufferCursor, TreeBuffer, TreeNode, BufferContext, BufferNode, TreeCursor, nodeSizeCache, TreeFragment, Parser, StringInput, stoppedInner;
var init_dist5 = __esm({
  "node_modules/@lezer/common/dist/index.js"() {
    init_shims();
    DefaultBufferLength = 1024;
    nextPropID = 0;
    Range2 = class {
      constructor(from, to) {
        this.from = from;
        this.to = to;
      }
    };
    NodeProp = class {
      constructor(config = {}) {
        this.id = nextPropID++;
        this.perNode = !!config.perNode;
        this.deserialize = config.deserialize || (() => {
          throw new Error("This node type doesn't define a deserialize function");
        });
      }
      add(match) {
        if (this.perNode)
          throw new RangeError("Can't add per-node props to node types");
        if (typeof match != "function")
          match = NodeType.match(match);
        return (type) => {
          let result = match(type);
          return result === void 0 ? null : [this, result];
        };
      }
    };
    NodeProp.closedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
    NodeProp.openedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
    NodeProp.group = new NodeProp({ deserialize: (str) => str.split(" ") });
    NodeProp.contextHash = new NodeProp({ perNode: true });
    NodeProp.lookAhead = new NodeProp({ perNode: true });
    NodeProp.mounted = new NodeProp({ perNode: true });
    noProps = Object.create(null);
    NodeType = class {
      constructor(name2, props, id2, flags = 0) {
        this.name = name2;
        this.props = props;
        this.id = id2;
        this.flags = flags;
      }
      static define(spec) {
        let props = spec.props && spec.props.length ? Object.create(null) : noProps;
        let flags = (spec.top ? 1 : 0) | (spec.skipped ? 2 : 0) | (spec.error ? 4 : 0) | (spec.name == null ? 8 : 0);
        let type = new NodeType(spec.name || "", props, spec.id, flags);
        if (spec.props)
          for (let src of spec.props) {
            if (!Array.isArray(src))
              src = src(type);
            if (src) {
              if (src[0].perNode)
                throw new RangeError("Can't store a per-node prop on a node type");
              props[src[0].id] = src[1];
            }
          }
        return type;
      }
      prop(prop) {
        return this.props[prop.id];
      }
      get isTop() {
        return (this.flags & 1) > 0;
      }
      get isSkipped() {
        return (this.flags & 2) > 0;
      }
      get isError() {
        return (this.flags & 4) > 0;
      }
      get isAnonymous() {
        return (this.flags & 8) > 0;
      }
      is(name2) {
        if (typeof name2 == "string") {
          if (this.name == name2)
            return true;
          let group = this.prop(NodeProp.group);
          return group ? group.indexOf(name2) > -1 : false;
        }
        return this.id == name2;
      }
      static match(map) {
        let direct = Object.create(null);
        for (let prop in map)
          for (let name2 of prop.split(" "))
            direct[name2] = map[prop];
        return (node) => {
          for (let groups = node.prop(NodeProp.group), i2 = -1; i2 < (groups ? groups.length : 0); i2++) {
            let found = direct[i2 < 0 ? node.name : groups[i2]];
            if (found)
              return found;
          }
        };
      }
    };
    NodeType.none = new NodeType("", Object.create(null), 0, 8);
    NodeSet = class {
      constructor(types3) {
        this.types = types3;
        for (let i2 = 0; i2 < types3.length; i2++)
          if (types3[i2].id != i2)
            throw new RangeError("Node type ids should correspond to array positions when creating a node set");
      }
      extend(...props) {
        let newTypes = [];
        for (let type of this.types) {
          let newProps = null;
          for (let source of props) {
            let add = source(type);
            if (add) {
              if (!newProps)
                newProps = Object.assign({}, type.props);
              newProps[add[0].id] = add[1];
            }
          }
          newTypes.push(newProps ? new NodeType(type.name, newProps, type.id, type.flags) : type);
        }
        return new NodeSet(newTypes);
      }
    };
    CachedNode = new WeakMap();
    CachedInnerNode = new WeakMap();
    Tree = class {
      constructor(type, children, positions, length, props) {
        this.type = type;
        this.children = children;
        this.positions = positions;
        this.length = length;
        this.props = null;
        if (props && props.length) {
          this.props = Object.create(null);
          for (let [prop, value] of props)
            this.props[typeof prop == "number" ? prop : prop.id] = value;
        }
      }
      toString() {
        let mounted = this.prop(NodeProp.mounted);
        if (mounted && !mounted.overlay)
          return mounted.tree.toString();
        let children = "";
        for (let ch of this.children) {
          let str = ch.toString();
          if (str) {
            if (children)
              children += ",";
            children += str;
          }
        }
        return !this.type.name ? children : (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (children.length ? "(" + children + ")" : "");
      }
      cursor(pos, side = 0) {
        let scope = pos != null && CachedNode.get(this) || this.topNode;
        let cursor = new TreeCursor(scope);
        if (pos != null) {
          cursor.moveTo(pos, side);
          CachedNode.set(this, cursor._tree);
        }
        return cursor;
      }
      fullCursor() {
        return new TreeCursor(this.topNode, 1);
      }
      get topNode() {
        return new TreeNode(this, 0, 0, null);
      }
      resolve(pos, side = 0) {
        let node = resolveNode(CachedNode.get(this) || this.topNode, pos, side, false);
        CachedNode.set(this, node);
        return node;
      }
      resolveInner(pos, side = 0) {
        let node = resolveNode(CachedInnerNode.get(this) || this.topNode, pos, side, true);
        CachedInnerNode.set(this, node);
        return node;
      }
      iterate(spec) {
        let { enter, leave, from = 0, to = this.length } = spec;
        for (let c = this.cursor(), get = () => c.node; ; ) {
          let mustLeave = false;
          if (c.from <= to && c.to >= from && (c.type.isAnonymous || enter(c.type, c.from, c.to, get) !== false)) {
            if (c.firstChild())
              continue;
            if (!c.type.isAnonymous)
              mustLeave = true;
          }
          for (; ; ) {
            if (mustLeave && leave)
              leave(c.type, c.from, c.to, get);
            mustLeave = c.type.isAnonymous;
            if (c.nextSibling())
              break;
            if (!c.parent())
              return;
            mustLeave = true;
          }
        }
      }
      prop(prop) {
        return !prop.perNode ? this.type.prop(prop) : this.props ? this.props[prop.id] : void 0;
      }
      get propValues() {
        let result = [];
        if (this.props)
          for (let id2 in this.props)
            result.push([+id2, this.props[id2]]);
        return result;
      }
      balance(config = {}) {
        return this.children.length <= 8 ? this : balanceRange(NodeType.none, this.children, this.positions, 0, this.children.length, 0, this.length, (children, positions, length) => new Tree(this.type, children, positions, length, this.propValues), config.makeTree || ((children, positions, length) => new Tree(NodeType.none, children, positions, length)));
      }
      static build(data) {
        return buildTree(data);
      }
    };
    Tree.empty = new Tree(NodeType.none, [], [], 0);
    FlatBufferCursor = class {
      constructor(buffer, index2) {
        this.buffer = buffer;
        this.index = index2;
      }
      get id() {
        return this.buffer[this.index - 4];
      }
      get start() {
        return this.buffer[this.index - 3];
      }
      get end() {
        return this.buffer[this.index - 2];
      }
      get size() {
        return this.buffer[this.index - 1];
      }
      get pos() {
        return this.index;
      }
      next() {
        this.index -= 4;
      }
      fork() {
        return new FlatBufferCursor(this.buffer, this.index);
      }
    };
    TreeBuffer = class {
      constructor(buffer, length, set) {
        this.buffer = buffer;
        this.length = length;
        this.set = set;
      }
      get type() {
        return NodeType.none;
      }
      toString() {
        let result = [];
        for (let index2 = 0; index2 < this.buffer.length; ) {
          result.push(this.childString(index2));
          index2 = this.buffer[index2 + 3];
        }
        return result.join(",");
      }
      childString(index2) {
        let id2 = this.buffer[index2], endIndex = this.buffer[index2 + 3];
        let type = this.set.types[id2], result = type.name;
        if (/\W/.test(result) && !type.isError)
          result = JSON.stringify(result);
        index2 += 4;
        if (endIndex == index2)
          return result;
        let children = [];
        while (index2 < endIndex) {
          children.push(this.childString(index2));
          index2 = this.buffer[index2 + 3];
        }
        return result + "(" + children.join(",") + ")";
      }
      findChild(startIndex, endIndex, dir, pos, side) {
        let { buffer } = this, pick = -1;
        for (let i2 = startIndex; i2 != endIndex; i2 = buffer[i2 + 3]) {
          if (checkSide(side, pos, buffer[i2 + 1], buffer[i2 + 2])) {
            pick = i2;
            if (dir > 0)
              break;
          }
        }
        return pick;
      }
      slice(startI, endI, from, to) {
        let b = this.buffer;
        let copy = new Uint16Array(endI - startI);
        for (let i2 = startI, j = 0; i2 < endI; ) {
          copy[j++] = b[i2++];
          copy[j++] = b[i2++] - from;
          copy[j++] = b[i2++] - from;
          copy[j++] = b[i2++] - startI;
        }
        return new TreeBuffer(copy, to - from, this.set);
      }
    };
    TreeNode = class {
      constructor(node, _from, index2, _parent) {
        this.node = node;
        this._from = _from;
        this.index = index2;
        this._parent = _parent;
      }
      get type() {
        return this.node.type;
      }
      get name() {
        return this.node.type.name;
      }
      get from() {
        return this._from;
      }
      get to() {
        return this._from + this.node.length;
      }
      nextChild(i2, dir, pos, side, mode = 0) {
        for (let parent = this; ; ) {
          for (let { children, positions } = parent.node, e2 = dir > 0 ? children.length : -1; i2 != e2; i2 += dir) {
            let next = children[i2], start = positions[i2] + parent._from;
            if (!checkSide(side, pos, start, start + next.length))
              continue;
            if (next instanceof TreeBuffer) {
              if (mode & 2)
                continue;
              let index2 = next.findChild(0, next.buffer.length, dir, pos - start, side);
              if (index2 > -1)
                return new BufferNode(new BufferContext(parent, next, i2, start), null, index2);
            } else if (mode & 1 || (!next.type.isAnonymous || hasChild(next))) {
              let mounted;
              if (!(mode & 1) && next.props && (mounted = next.prop(NodeProp.mounted)) && !mounted.overlay)
                return new TreeNode(mounted.tree, start, i2, parent);
              let inner = new TreeNode(next, start, i2, parent);
              return mode & 1 || !inner.type.isAnonymous ? inner : inner.nextChild(dir < 0 ? next.children.length - 1 : 0, dir, pos, side);
            }
          }
          if (mode & 1 || !parent.type.isAnonymous)
            return null;
          if (parent.index >= 0)
            i2 = parent.index + dir;
          else
            i2 = dir < 0 ? -1 : parent._parent.node.children.length;
          parent = parent._parent;
          if (!parent)
            return null;
        }
      }
      get firstChild() {
        return this.nextChild(0, 1, 0, 4);
      }
      get lastChild() {
        return this.nextChild(this.node.children.length - 1, -1, 0, 4);
      }
      childAfter(pos) {
        return this.nextChild(0, 1, pos, 2);
      }
      childBefore(pos) {
        return this.nextChild(this.node.children.length - 1, -1, pos, -2);
      }
      enter(pos, side, overlays = true, buffers = true) {
        let mounted;
        if (overlays && (mounted = this.node.prop(NodeProp.mounted)) && mounted.overlay) {
          let rPos = pos - this.from;
          for (let { from, to } of mounted.overlay) {
            if ((side > 0 ? from <= rPos : from < rPos) && (side < 0 ? to >= rPos : to > rPos))
              return new TreeNode(mounted.tree, mounted.overlay[0].from + this.from, -1, this);
          }
        }
        return this.nextChild(0, 1, pos, side, buffers ? 0 : 2);
      }
      nextSignificantParent() {
        let val = this;
        while (val.type.isAnonymous && val._parent)
          val = val._parent;
        return val;
      }
      get parent() {
        return this._parent ? this._parent.nextSignificantParent() : null;
      }
      get nextSibling() {
        return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null;
      }
      get prevSibling() {
        return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null;
      }
      get cursor() {
        return new TreeCursor(this);
      }
      get tree() {
        return this.node;
      }
      toTree() {
        return this.node;
      }
      resolve(pos, side = 0) {
        return resolveNode(this, pos, side, false);
      }
      resolveInner(pos, side = 0) {
        return resolveNode(this, pos, side, true);
      }
      enterUnfinishedNodesBefore(pos) {
        return enterUnfinishedNodesBefore(this, pos);
      }
      getChild(type, before = null, after = null) {
        let r2 = getChildren(this, type, before, after);
        return r2.length ? r2[0] : null;
      }
      getChildren(type, before = null, after = null) {
        return getChildren(this, type, before, after);
      }
      toString() {
        return this.node.toString();
      }
    };
    BufferContext = class {
      constructor(parent, buffer, index2, start) {
        this.parent = parent;
        this.buffer = buffer;
        this.index = index2;
        this.start = start;
      }
    };
    BufferNode = class {
      constructor(context, _parent, index2) {
        this.context = context;
        this._parent = _parent;
        this.index = index2;
        this.type = context.buffer.set.types[context.buffer.buffer[index2]];
      }
      get name() {
        return this.type.name;
      }
      get from() {
        return this.context.start + this.context.buffer.buffer[this.index + 1];
      }
      get to() {
        return this.context.start + this.context.buffer.buffer[this.index + 2];
      }
      child(dir, pos, side) {
        let { buffer } = this.context;
        let index2 = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.context.start, side);
        return index2 < 0 ? null : new BufferNode(this.context, this, index2);
      }
      get firstChild() {
        return this.child(1, 0, 4);
      }
      get lastChild() {
        return this.child(-1, 0, 4);
      }
      childAfter(pos) {
        return this.child(1, pos, 2);
      }
      childBefore(pos) {
        return this.child(-1, pos, -2);
      }
      enter(pos, side, overlays, buffers = true) {
        if (!buffers)
          return null;
        let { buffer } = this.context;
        let index2 = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], side > 0 ? 1 : -1, pos - this.context.start, side);
        return index2 < 0 ? null : new BufferNode(this.context, this, index2);
      }
      get parent() {
        return this._parent || this.context.parent.nextSignificantParent();
      }
      externalSibling(dir) {
        return this._parent ? null : this.context.parent.nextChild(this.context.index + dir, dir, 0, 4);
      }
      get nextSibling() {
        let { buffer } = this.context;
        let after = buffer.buffer[this.index + 3];
        if (after < (this._parent ? buffer.buffer[this._parent.index + 3] : buffer.buffer.length))
          return new BufferNode(this.context, this._parent, after);
        return this.externalSibling(1);
      }
      get prevSibling() {
        let { buffer } = this.context;
        let parentStart = this._parent ? this._parent.index + 4 : 0;
        if (this.index == parentStart)
          return this.externalSibling(-1);
        return new BufferNode(this.context, this._parent, buffer.findChild(parentStart, this.index, -1, 0, 4));
      }
      get cursor() {
        return new TreeCursor(this);
      }
      get tree() {
        return null;
      }
      toTree() {
        let children = [], positions = [];
        let { buffer } = this.context;
        let startI = this.index + 4, endI = buffer.buffer[this.index + 3];
        if (endI > startI) {
          let from = buffer.buffer[this.index + 1], to = buffer.buffer[this.index + 2];
          children.push(buffer.slice(startI, endI, from, to));
          positions.push(0);
        }
        return new Tree(this.type, children, positions, this.to - this.from);
      }
      resolve(pos, side = 0) {
        return resolveNode(this, pos, side, false);
      }
      resolveInner(pos, side = 0) {
        return resolveNode(this, pos, side, true);
      }
      enterUnfinishedNodesBefore(pos) {
        return enterUnfinishedNodesBefore(this, pos);
      }
      toString() {
        return this.context.buffer.childString(this.index);
      }
      getChild(type, before = null, after = null) {
        let r2 = getChildren(this, type, before, after);
        return r2.length ? r2[0] : null;
      }
      getChildren(type, before = null, after = null) {
        return getChildren(this, type, before, after);
      }
    };
    TreeCursor = class {
      constructor(node, mode = 0) {
        this.mode = mode;
        this.buffer = null;
        this.stack = [];
        this.index = 0;
        this.bufferNode = null;
        if (node instanceof TreeNode) {
          this.yieldNode(node);
        } else {
          this._tree = node.context.parent;
          this.buffer = node.context;
          for (let n = node._parent; n; n = n._parent)
            this.stack.unshift(n.index);
          this.bufferNode = node;
          this.yieldBuf(node.index);
        }
      }
      get name() {
        return this.type.name;
      }
      yieldNode(node) {
        if (!node)
          return false;
        this._tree = node;
        this.type = node.type;
        this.from = node.from;
        this.to = node.to;
        return true;
      }
      yieldBuf(index2, type) {
        this.index = index2;
        let { start, buffer } = this.buffer;
        this.type = type || buffer.set.types[buffer.buffer[index2]];
        this.from = start + buffer.buffer[index2 + 1];
        this.to = start + buffer.buffer[index2 + 2];
        return true;
      }
      yield(node) {
        if (!node)
          return false;
        if (node instanceof TreeNode) {
          this.buffer = null;
          return this.yieldNode(node);
        }
        this.buffer = node.context;
        return this.yieldBuf(node.index, node.type);
      }
      toString() {
        return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
      }
      enterChild(dir, pos, side) {
        if (!this.buffer)
          return this.yield(this._tree.nextChild(dir < 0 ? this._tree.node.children.length - 1 : 0, dir, pos, side, this.mode));
        let { buffer } = this.buffer;
        let index2 = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.buffer.start, side);
        if (index2 < 0)
          return false;
        this.stack.push(this.index);
        return this.yieldBuf(index2);
      }
      firstChild() {
        return this.enterChild(1, 0, 4);
      }
      lastChild() {
        return this.enterChild(-1, 0, 4);
      }
      childAfter(pos) {
        return this.enterChild(1, pos, 2);
      }
      childBefore(pos) {
        return this.enterChild(-1, pos, -2);
      }
      enter(pos, side, overlays = true, buffers = true) {
        if (!this.buffer)
          return this.yield(this._tree.enter(pos, side, overlays && !(this.mode & 1), buffers));
        return buffers ? this.enterChild(1, pos, side) : false;
      }
      parent() {
        if (!this.buffer)
          return this.yieldNode(this.mode & 1 ? this._tree._parent : this._tree.parent);
        if (this.stack.length)
          return this.yieldBuf(this.stack.pop());
        let parent = this.mode & 1 ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
        this.buffer = null;
        return this.yieldNode(parent);
      }
      sibling(dir) {
        if (!this.buffer)
          return !this._tree._parent ? false : this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + dir, dir, 0, 4, this.mode));
        let { buffer } = this.buffer, d = this.stack.length - 1;
        if (dir < 0) {
          let parentStart = d < 0 ? 0 : this.stack[d] + 4;
          if (this.index != parentStart)
            return this.yieldBuf(buffer.findChild(parentStart, this.index, -1, 0, 4));
        } else {
          let after = buffer.buffer[this.index + 3];
          if (after < (d < 0 ? buffer.buffer.length : buffer.buffer[this.stack[d] + 3]))
            return this.yieldBuf(after);
        }
        return d < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + dir, dir, 0, 4, this.mode)) : false;
      }
      nextSibling() {
        return this.sibling(1);
      }
      prevSibling() {
        return this.sibling(-1);
      }
      atLastNode(dir) {
        let index2, parent, { buffer } = this;
        if (buffer) {
          if (dir > 0) {
            if (this.index < buffer.buffer.buffer.length)
              return false;
          } else {
            for (let i2 = 0; i2 < this.index; i2++)
              if (buffer.buffer.buffer[i2 + 3] < this.index)
                return false;
          }
          ({ index: index2, parent } = buffer);
        } else {
          ({ index: index2, _parent: parent } = this._tree);
        }
        for (; parent; { index: index2, _parent: parent } = parent) {
          if (index2 > -1)
            for (let i2 = index2 + dir, e2 = dir < 0 ? -1 : parent.node.children.length; i2 != e2; i2 += dir) {
              let child = parent.node.children[i2];
              if (this.mode & 1 || child instanceof TreeBuffer || !child.type.isAnonymous || hasChild(child))
                return false;
            }
        }
        return true;
      }
      move(dir, enter) {
        if (enter && this.enterChild(dir, 0, 4))
          return true;
        for (; ; ) {
          if (this.sibling(dir))
            return true;
          if (this.atLastNode(dir) || !this.parent())
            return false;
        }
      }
      next(enter = true) {
        return this.move(1, enter);
      }
      prev(enter = true) {
        return this.move(-1, enter);
      }
      moveTo(pos, side = 0) {
        while (this.from == this.to || (side < 1 ? this.from >= pos : this.from > pos) || (side > -1 ? this.to <= pos : this.to < pos))
          if (!this.parent())
            break;
        while (this.enterChild(1, pos, side)) {
        }
        return this;
      }
      get node() {
        if (!this.buffer)
          return this._tree;
        let cache = this.bufferNode, result = null, depth = 0;
        if (cache && cache.context == this.buffer) {
          scan:
            for (let index2 = this.index, d = this.stack.length; d >= 0; ) {
              for (let c = cache; c; c = c._parent)
                if (c.index == index2) {
                  if (index2 == this.index)
                    return c;
                  result = c;
                  depth = d + 1;
                  break scan;
                }
              index2 = this.stack[--d];
            }
        }
        for (let i2 = depth; i2 < this.stack.length; i2++)
          result = new BufferNode(this.buffer, result, this.stack[i2]);
        return this.bufferNode = new BufferNode(this.buffer, result, this.index);
      }
      get tree() {
        return this.buffer ? null : this._tree.node;
      }
    };
    nodeSizeCache = new WeakMap();
    TreeFragment = class {
      constructor(from, to, tree, offset, openStart = false, openEnd = false) {
        this.from = from;
        this.to = to;
        this.tree = tree;
        this.offset = offset;
        this.open = (openStart ? 1 : 0) | (openEnd ? 2 : 0);
      }
      get openStart() {
        return (this.open & 1) > 0;
      }
      get openEnd() {
        return (this.open & 2) > 0;
      }
      static addTree(tree, fragments = [], partial = false) {
        let result = [new TreeFragment(0, tree.length, tree, 0, false, partial)];
        for (let f3 of fragments)
          if (f3.to > tree.length)
            result.push(f3);
        return result;
      }
      static applyChanges(fragments, changes, minGap = 128) {
        if (!changes.length)
          return fragments;
        let result = [];
        let fI = 1, nextF = fragments.length ? fragments[0] : null;
        for (let cI = 0, pos = 0, off = 0; ; cI++) {
          let nextC = cI < changes.length ? changes[cI] : null;
          let nextPos = nextC ? nextC.fromA : 1e9;
          if (nextPos - pos >= minGap)
            while (nextF && nextF.from < nextPos) {
              let cut = nextF;
              if (pos >= cut.from || nextPos <= cut.to || off) {
                let fFrom = Math.max(cut.from, pos) - off, fTo = Math.min(cut.to, nextPos) - off;
                cut = fFrom >= fTo ? null : new TreeFragment(fFrom, fTo, cut.tree, cut.offset + off, cI > 0, !!nextC);
              }
              if (cut)
                result.push(cut);
              if (nextF.to > nextPos)
                break;
              nextF = fI < fragments.length ? fragments[fI++] : null;
            }
          if (!nextC)
            break;
          pos = nextC.toA;
          off = nextC.toA - nextC.toB;
        }
        return result;
      }
    };
    Parser = class {
      startParse(input, fragments, ranges) {
        if (typeof input == "string")
          input = new StringInput(input);
        ranges = !ranges ? [new Range2(0, input.length)] : ranges.length ? ranges.map((r2) => new Range2(r2.from, r2.to)) : [new Range2(0, 0)];
        return this.createParse(input, fragments || [], ranges);
      }
      parse(input, fragments, ranges) {
        let parse = this.startParse(input, fragments, ranges);
        for (; ; ) {
          let done = parse.advance();
          if (done)
            return done;
        }
      }
    };
    StringInput = class {
      constructor(string2) {
        this.string = string2;
      }
      get length() {
        return this.string.length;
      }
      chunk(from) {
        return this.string.slice(from);
      }
      get lineChunks() {
        return false;
      }
      read(from, to) {
        return this.string.slice(from, to);
      }
    };
    stoppedInner = new NodeProp({ perNode: true });
  }
});

// node_modules/@codemirror/language/dist/index.js
function defineLanguageFacet(baseData) {
  return Facet.define({
    combine: baseData ? (values) => values.concat(baseData) : void 0
  });
}
function languageDataFacetAt(state, pos, side) {
  let topLang = state.facet(language);
  if (!topLang)
    return null;
  let facet = topLang.data;
  if (topLang.allowsNesting) {
    for (let node = syntaxTree(state).topNode; node; node = node.enter(pos, side, true, false))
      facet = node.type.prop(languageDataProp) || facet;
  }
  return facet;
}
function syntaxTree(state) {
  let field = state.field(Language.state, false);
  return field ? field.tree : Tree.empty;
}
function cutFragments(fragments, from, to) {
  return TreeFragment.applyChanges(fragments, [{ fromA: from, toA: to, fromB: from, toB: to }]);
}
function bracketedAligned(context) {
  let tree = context.node;
  let openToken = tree.childAfter(tree.from), last = tree.lastChild;
  if (!openToken)
    return null;
  let sim = context.options.simulateBreak;
  let openLine = context.state.doc.lineAt(openToken.from);
  let lineEnd = sim == null || sim <= openLine.from ? openLine.to : Math.min(openLine.to, sim);
  for (let pos = openToken.to; ; ) {
    let next = tree.childAfter(pos);
    if (!next || next == last)
      return null;
    if (!next.type.isSkipped)
      return next.from < lineEnd ? openToken : null;
    pos = next.to;
  }
}
function delimitedIndent({ closing, align = true, units = 1 }) {
  return (context) => delimitedStrategy(context, align, units, closing);
}
function delimitedStrategy(context, align, units, closing, closedAt) {
  let after = context.textAfter, space2 = after.match(/^\s*/)[0].length;
  let closed = closing && after.slice(space2, space2 + closing.length) == closing || closedAt == context.pos + space2;
  let aligned = align ? bracketedAligned(context) : null;
  if (aligned)
    return closed ? context.column(aligned.from) : context.column(aligned.to);
  return context.baseIndent + (closed ? 0 : context.unit * units);
}
function continuedIndent({ except, units = 1 } = {}) {
  return (context) => {
    let matchExcept = except && except.test(context.textAfter);
    return context.baseIndent + (matchExcept ? 0 : units * context.unit);
  };
}
function foldInside(node) {
  let first = node.firstChild, last = node.lastChild;
  return first && first.to < last.from ? { from: first.to, to: last.type.isError ? node.to : last.from } : null;
}
var languageDataProp, Language, LRLanguage, DocInput, currentContext, ParseContext, LanguageState, requestIdle, parseWorker, language, LanguageSupport, indentUnit, indentNodeProp, flatIndent, foldNodeProp;
var init_dist6 = __esm({
  "node_modules/@codemirror/language/dist/index.js"() {
    init_shims();
    init_dist5();
    init_dist2();
    init_dist4();
    languageDataProp = /* @__PURE__ */ new NodeProp();
    Language = class {
      constructor(data, parser2, topNode, extraExtensions = []) {
        this.data = data;
        this.topNode = topNode;
        if (!EditorState.prototype.hasOwnProperty("tree"))
          Object.defineProperty(EditorState.prototype, "tree", { get() {
            return syntaxTree(this);
          } });
        this.parser = parser2;
        this.extension = [
          language.of(this),
          EditorState.languageData.of((state, pos, side) => state.facet(languageDataFacetAt(state, pos, side)))
        ].concat(extraExtensions);
      }
      isActiveAt(state, pos, side = -1) {
        return languageDataFacetAt(state, pos, side) == this.data;
      }
      findRegions(state) {
        let lang = state.facet(language);
        if ((lang === null || lang === void 0 ? void 0 : lang.data) == this.data)
          return [{ from: 0, to: state.doc.length }];
        if (!lang || !lang.allowsNesting)
          return [];
        let result = [];
        let explore = (tree, from) => {
          if (tree.prop(languageDataProp) == this.data) {
            result.push({ from, to: from + tree.length });
            return;
          }
          let mount = tree.prop(NodeProp.mounted);
          if (mount) {
            if (mount.tree.prop(languageDataProp) == this.data) {
              if (mount.overlay)
                for (let r2 of mount.overlay)
                  result.push({ from: r2.from + from, to: r2.to + from });
              else
                result.push({ from, to: from + tree.length });
              return;
            } else if (mount.overlay) {
              let size = result.length;
              explore(mount.tree, mount.overlay[0].from + from);
              if (result.length > size)
                return;
            }
          }
          for (let i2 = 0; i2 < tree.children.length; i2++) {
            let ch = tree.children[i2];
            if (ch instanceof Tree)
              explore(ch, tree.positions[i2] + from);
          }
        };
        explore(syntaxTree(state), 0);
        return result;
      }
      get allowsNesting() {
        return true;
      }
    };
    Language.setState = /* @__PURE__ */ StateEffect.define();
    LRLanguage = class extends Language {
      constructor(data, parser2) {
        super(data, parser2, parser2.topNode);
        this.parser = parser2;
      }
      static define(spec) {
        let data = defineLanguageFacet(spec.languageData);
        return new LRLanguage(data, spec.parser.configure({
          props: [languageDataProp.add((type) => type.isTop ? data : void 0)]
        }));
      }
      configure(options2) {
        return new LRLanguage(this.data, this.parser.configure(options2));
      }
      get allowsNesting() {
        return this.parser.wrappers.length > 0;
      }
    };
    DocInput = class {
      constructor(doc2, length = doc2.length) {
        this.doc = doc2;
        this.length = length;
        this.cursorPos = 0;
        this.string = "";
        this.cursor = doc2.iter();
      }
      syncTo(pos) {
        this.string = this.cursor.next(pos - this.cursorPos).value;
        this.cursorPos = pos + this.string.length;
        return this.cursorPos - this.string.length;
      }
      chunk(pos) {
        this.syncTo(pos);
        return this.string;
      }
      get lineChunks() {
        return true;
      }
      read(from, to) {
        let stringStart = this.cursorPos - this.string.length;
        if (from < stringStart || to >= this.cursorPos)
          return this.doc.sliceString(from, to);
        else
          return this.string.slice(from - stringStart, to - stringStart);
      }
    };
    currentContext = null;
    ParseContext = class {
      constructor(parser2, state, fragments = [], tree, treeLen, viewport, skipped, scheduleOn) {
        this.parser = parser2;
        this.state = state;
        this.fragments = fragments;
        this.tree = tree;
        this.treeLen = treeLen;
        this.viewport = viewport;
        this.skipped = skipped;
        this.scheduleOn = scheduleOn;
        this.parse = null;
        this.tempSkipped = [];
      }
      startParse() {
        return this.parser.startParse(new DocInput(this.state.doc), this.fragments);
      }
      work(time, upto) {
        if (upto != null && upto >= this.state.doc.length)
          upto = void 0;
        if (this.tree != Tree.empty && this.isDone(upto !== null && upto !== void 0 ? upto : this.state.doc.length)) {
          this.takeTree();
          return true;
        }
        return this.withContext(() => {
          var _a;
          let endTime = Date.now() + time;
          if (!this.parse)
            this.parse = this.startParse();
          if (upto != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > upto) && upto < this.state.doc.length)
            this.parse.stopAt(upto);
          for (; ; ) {
            let done = this.parse.advance();
            if (done) {
              this.fragments = this.withoutTempSkipped(TreeFragment.addTree(done, this.fragments, this.parse.stoppedAt != null));
              this.treeLen = (_a = this.parse.stoppedAt) !== null && _a !== void 0 ? _a : this.state.doc.length;
              this.tree = done;
              this.parse = null;
              if (this.treeLen < (upto !== null && upto !== void 0 ? upto : this.state.doc.length))
                this.parse = this.startParse();
              else
                return true;
            }
            if (Date.now() > endTime)
              return false;
          }
        });
      }
      takeTree() {
        let pos, tree;
        if (this.parse && (pos = this.parse.parsedPos) >= this.treeLen) {
          if (this.parse.stoppedAt == null || this.parse.stoppedAt > pos)
            this.parse.stopAt(pos);
          this.withContext(() => {
            while (!(tree = this.parse.advance())) {
            }
          });
          this.treeLen = pos;
          this.tree = tree;
          this.fragments = this.withoutTempSkipped(TreeFragment.addTree(this.tree, this.fragments, true));
          this.parse = null;
        }
      }
      withContext(f3) {
        let prev = currentContext;
        currentContext = this;
        try {
          return f3();
        } finally {
          currentContext = prev;
        }
      }
      withoutTempSkipped(fragments) {
        for (let r2; r2 = this.tempSkipped.pop(); )
          fragments = cutFragments(fragments, r2.from, r2.to);
        return fragments;
      }
      changes(changes, newState) {
        let { fragments, tree, treeLen, viewport, skipped } = this;
        this.takeTree();
        if (!changes.empty) {
          let ranges = [];
          changes.iterChangedRanges((fromA, toA, fromB, toB) => ranges.push({ fromA, toA, fromB, toB }));
          fragments = TreeFragment.applyChanges(fragments, ranges);
          tree = Tree.empty;
          treeLen = 0;
          viewport = { from: changes.mapPos(viewport.from, -1), to: changes.mapPos(viewport.to, 1) };
          if (this.skipped.length) {
            skipped = [];
            for (let r2 of this.skipped) {
              let from = changes.mapPos(r2.from, 1), to = changes.mapPos(r2.to, -1);
              if (from < to)
                skipped.push({ from, to });
            }
          }
        }
        return new ParseContext(this.parser, newState, fragments, tree, treeLen, viewport, skipped, this.scheduleOn);
      }
      updateViewport(viewport) {
        if (this.viewport.from == viewport.from && this.viewport.to == viewport.to)
          return false;
        this.viewport = viewport;
        let startLen = this.skipped.length;
        for (let i2 = 0; i2 < this.skipped.length; i2++) {
          let { from, to } = this.skipped[i2];
          if (from < viewport.to && to > viewport.from) {
            this.fragments = cutFragments(this.fragments, from, to);
            this.skipped.splice(i2--, 1);
          }
        }
        if (this.skipped.length >= startLen)
          return false;
        this.reset();
        return true;
      }
      reset() {
        if (this.parse) {
          this.takeTree();
          this.parse = null;
        }
      }
      skipUntilInView(from, to) {
        this.skipped.push({ from, to });
      }
      static getSkippingParser(until) {
        return new class extends Parser {
          createParse(input, fragments, ranges) {
            let from = ranges[0].from, to = ranges[ranges.length - 1].to;
            let parser2 = {
              parsedPos: from,
              advance() {
                let cx = currentContext;
                if (cx) {
                  for (let r2 of ranges)
                    cx.tempSkipped.push(r2);
                  if (until)
                    cx.scheduleOn = cx.scheduleOn ? Promise.all([cx.scheduleOn, until]) : until;
                }
                this.parsedPos = to;
                return new Tree(NodeType.none, [], [], to - from);
              },
              stoppedAt: null,
              stopAt() {
              }
            };
            return parser2;
          }
        }();
      }
      isDone(upto) {
        upto = Math.min(upto, this.state.doc.length);
        let frags = this.fragments;
        return this.treeLen >= upto && frags.length && frags[0].from == 0 && frags[0].to >= upto;
      }
      static get() {
        return currentContext;
      }
    };
    LanguageState = class {
      constructor(context) {
        this.context = context;
        this.tree = context.tree;
      }
      apply(tr) {
        if (!tr.docChanged)
          return this;
        let newCx = this.context.changes(tr.changes, tr.state);
        let upto = this.context.treeLen == tr.startState.doc.length ? void 0 : Math.max(tr.changes.mapPos(this.context.treeLen), newCx.viewport.to);
        if (!newCx.work(20, upto))
          newCx.takeTree();
        return new LanguageState(newCx);
      }
      static init(state) {
        let vpTo = Math.min(3e3, state.doc.length);
        let parseState = new ParseContext(state.facet(language).parser, state, [], Tree.empty, 0, { from: 0, to: vpTo }, [], null);
        if (!parseState.work(20, vpTo))
          parseState.takeTree();
        return new LanguageState(parseState);
      }
    };
    Language.state = /* @__PURE__ */ StateField.define({
      create: LanguageState.init,
      update(value, tr) {
        for (let e2 of tr.effects)
          if (e2.is(Language.setState))
            return e2.value;
        if (tr.startState.facet(language) != tr.state.facet(language))
          return LanguageState.init(tr.state);
        return value.apply(tr);
      }
    });
    requestIdle = (callback) => {
      let timeout = setTimeout(() => callback(), 500);
      return () => clearTimeout(timeout);
    };
    if (typeof requestIdleCallback != "undefined")
      requestIdle = (callback) => {
        let idle = -1, timeout = setTimeout(() => {
          idle = requestIdleCallback(callback, { timeout: 500 - 100 });
        }, 100);
        return () => idle < 0 ? clearTimeout(timeout) : cancelIdleCallback(idle);
      };
    parseWorker = /* @__PURE__ */ ViewPlugin.fromClass(class ParseWorker {
      constructor(view) {
        this.view = view;
        this.working = null;
        this.workScheduled = 0;
        this.chunkEnd = -1;
        this.chunkBudget = -1;
        this.work = this.work.bind(this);
        this.scheduleWork();
      }
      update(update) {
        let cx = this.view.state.field(Language.state).context;
        if (cx.updateViewport(update.view.viewport) || this.view.viewport.to > cx.treeLen)
          this.scheduleWork();
        if (update.docChanged) {
          if (this.view.hasFocus)
            this.chunkBudget += 50;
          this.scheduleWork();
        }
        this.checkAsyncSchedule(cx);
      }
      scheduleWork() {
        if (this.working)
          return;
        let { state } = this.view, field = state.field(Language.state);
        if (field.tree != field.context.tree || !field.context.isDone(state.doc.length))
          this.working = requestIdle(this.work);
      }
      work(deadline) {
        this.working = null;
        let now2 = Date.now();
        if (this.chunkEnd < now2 && (this.chunkEnd < 0 || this.view.hasFocus)) {
          this.chunkEnd = now2 + 3e4;
          this.chunkBudget = 3e3;
        }
        if (this.chunkBudget <= 0)
          return;
        let { state, viewport: { to: vpTo } } = this.view, field = state.field(Language.state);
        if (field.tree == field.context.tree && field.context.isDone(vpTo + 1e5))
          return;
        let time = Math.min(this.chunkBudget, 100, deadline ? Math.max(25, deadline.timeRemaining() - 5) : 1e9);
        let viewportFirst = field.context.treeLen < vpTo && state.doc.length > vpTo + 1e3;
        let done = field.context.work(time, vpTo + (viewportFirst ? 0 : 1e5));
        this.chunkBudget -= Date.now() - now2;
        if (done || this.chunkBudget <= 0) {
          field.context.takeTree();
          this.view.dispatch({ effects: Language.setState.of(new LanguageState(field.context)) });
        }
        if (this.chunkBudget > 0 && !(done && !viewportFirst))
          this.scheduleWork();
        this.checkAsyncSchedule(field.context);
      }
      checkAsyncSchedule(cx) {
        if (cx.scheduleOn) {
          this.workScheduled++;
          cx.scheduleOn.then(() => this.scheduleWork()).catch((err) => logException(this.view.state, err)).then(() => this.workScheduled--);
          cx.scheduleOn = null;
        }
      }
      destroy() {
        if (this.working)
          this.working();
      }
      isWorking() {
        return this.working || this.workScheduled > 0;
      }
    }, {
      eventHandlers: { focus() {
        this.scheduleWork();
      } }
    });
    language = /* @__PURE__ */ Facet.define({
      combine(languages) {
        return languages.length ? languages[0] : null;
      },
      enables: [Language.state, parseWorker]
    });
    LanguageSupport = class {
      constructor(language2, support = []) {
        this.language = language2;
        this.support = support;
        this.extension = [language2, support];
      }
    };
    indentUnit = /* @__PURE__ */ Facet.define({
      combine: (values) => {
        if (!values.length)
          return "  ";
        if (!/^(?: +|\t+)$/.test(values[0]))
          throw new Error("Invalid indent unit: " + JSON.stringify(values[0]));
        return values[0];
      }
    });
    indentNodeProp = /* @__PURE__ */ new NodeProp();
    flatIndent = (context) => context.baseIndent;
    foldNodeProp = /* @__PURE__ */ new NodeProp();
  }
});

// node_modules/@codemirror/autocomplete/dist/index.js
function toSet(chars2) {
  let flat = Object.keys(chars2).join("");
  let words = /\w/.test(flat);
  if (words)
    flat = flat.replace(/\w/g, "");
  return `[${words ? "\\w" : ""}${flat.replace(/[^\w\s]/g, "\\$&")}]`;
}
function prefixMatch(options2) {
  let first = Object.create(null), rest = Object.create(null);
  for (let { label } of options2) {
    first[label[0]] = true;
    for (let i2 = 1; i2 < label.length; i2++)
      rest[label[i2]] = true;
  }
  let source = toSet(first) + toSet(rest) + "*$";
  return [new RegExp("^" + source), new RegExp(source)];
}
function completeFromList(list) {
  let options2 = list.map((o) => typeof o == "string" ? { label: o } : o);
  let [span, match] = options2.every((o) => /^\w+$/.test(o.label)) ? [/\w*$/, /\w+$/] : prefixMatch(options2);
  return (context) => {
    let token = context.matchBefore(match);
    return token || context.explicit ? { from: token ? token.from : context.pos, options: options2, span } : null;
  };
}
function ifNotIn(nodes, source) {
  return (context) => {
    for (let pos = syntaxTree(context.state).resolveInner(context.pos, -1); pos; pos = pos.parent)
      if (nodes.indexOf(pos.name) > -1)
        return null;
    return source(context);
  };
}
function fieldSelection(ranges, field) {
  return EditorSelection.create(ranges.filter((r2) => r2.field == field).map((r2) => EditorSelection.range(r2.from, r2.to)));
}
function snippet(template3) {
  let snippet2 = Snippet.parse(template3);
  return (editor, _completion, from, to) => {
    let { text, ranges } = snippet2.instantiate(editor.state, from);
    let spec = { changes: { from, to, insert: Text.of(text) } };
    if (ranges.length)
      spec.selection = fieldSelection(ranges, 0);
    if (ranges.length > 1) {
      let active = new ActiveSnippet(ranges, 0);
      let effects = spec.effects = [setActive.of(active)];
      if (editor.state.field(snippetState, false) === void 0)
        effects.push(StateEffect.appendConfig.of([snippetState, addSnippetKeymap, snippetPointerHandler, baseTheme2]));
    }
    editor.dispatch(editor.state.update(spec));
  };
}
function moveField(dir) {
  return ({ state, dispatch }) => {
    let active = state.field(snippetState, false);
    if (!active || dir < 0 && active.active == 0)
      return false;
    let next = active.active + dir, last = dir > 0 && !active.ranges.some((r2) => r2.field == next + dir);
    dispatch(state.update({
      selection: fieldSelection(active.ranges, next),
      effects: setActive.of(last ? null : new ActiveSnippet(active.ranges, next))
    }));
    return true;
  };
}
function snippetCompletion(template3, completion) {
  return Object.assign(Object.assign({}, completion), { apply: snippet(template3) });
}
var baseTheme2, FieldPos, FieldRange, Snippet, fieldMarker, fieldRange, ActiveSnippet, setActive, moveToField, snippetState, clearSnippet, nextSnippetField, prevSnippetField, defaultSnippetKeymap, snippetKeymap, addSnippetKeymap, snippetPointerHandler;
var init_dist7 = __esm({
  "node_modules/@codemirror/autocomplete/dist/index.js"() {
    init_shims();
    init_dist2();
    init_dist4();
    init_dist6();
    baseTheme2 = /* @__PURE__ */ EditorView.baseTheme({
      ".cm-tooltip.cm-tooltip-autocomplete": {
        "& > ul": {
          fontFamily: "monospace",
          whiteSpace: "nowrap",
          overflow: "hidden auto",
          maxWidth_fallback: "700px",
          maxWidth: "min(700px, 95vw)",
          minWidth: "250px",
          maxHeight: "10em",
          listStyle: "none",
          margin: 0,
          padding: 0,
          "& > li": {
            overflowX: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
            padding: "1px 3px",
            lineHeight: 1.2
          }
        }
      },
      "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
        background: "#39e",
        color: "white"
      },
      "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
        background: "#347",
        color: "white"
      },
      ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
        content: '"\xB7\xB7\xB7"',
        opacity: 0.5,
        display: "block",
        textAlign: "center"
      },
      ".cm-tooltip.cm-completionInfo": {
        position: "absolute",
        padding: "3px 9px",
        width: "max-content",
        maxWidth: "300px"
      },
      ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
      ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
      "&light .cm-snippetField": { backgroundColor: "#00000022" },
      "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
      ".cm-snippetFieldPosition": {
        verticalAlign: "text-top",
        width: 0,
        height: "1.15em",
        margin: "0 -0.7px -.7em",
        borderLeft: "1.4px dotted #888"
      },
      ".cm-completionMatchedText": {
        textDecoration: "underline"
      },
      ".cm-completionDetail": {
        marginLeft: "0.5em",
        fontStyle: "italic"
      },
      ".cm-completionIcon": {
        fontSize: "90%",
        width: ".8em",
        display: "inline-block",
        textAlign: "center",
        paddingRight: ".6em",
        opacity: "0.6"
      },
      ".cm-completionIcon-function, .cm-completionIcon-method": {
        "&:after": { content: "'\u0192'" }
      },
      ".cm-completionIcon-class": {
        "&:after": { content: "'\u25CB'" }
      },
      ".cm-completionIcon-interface": {
        "&:after": { content: "'\u25CC'" }
      },
      ".cm-completionIcon-variable": {
        "&:after": { content: "'\u{1D465}'" }
      },
      ".cm-completionIcon-constant": {
        "&:after": { content: "'\u{1D436}'" }
      },
      ".cm-completionIcon-type": {
        "&:after": { content: "'\u{1D461}'" }
      },
      ".cm-completionIcon-enum": {
        "&:after": { content: "'\u222A'" }
      },
      ".cm-completionIcon-property": {
        "&:after": { content: "'\u25A1'" }
      },
      ".cm-completionIcon-keyword": {
        "&:after": { content: "'\u{1F511}\uFE0E'" }
      },
      ".cm-completionIcon-namespace": {
        "&:after": { content: "'\u25A2'" }
      },
      ".cm-completionIcon-text": {
        "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
      }
    });
    FieldPos = class {
      constructor(field, line, from, to) {
        this.field = field;
        this.line = line;
        this.from = from;
        this.to = to;
      }
    };
    FieldRange = class {
      constructor(field, from, to) {
        this.field = field;
        this.from = from;
        this.to = to;
      }
      map(changes) {
        return new FieldRange(this.field, changes.mapPos(this.from, -1), changes.mapPos(this.to, 1));
      }
    };
    Snippet = class {
      constructor(lines, fieldPositions) {
        this.lines = lines;
        this.fieldPositions = fieldPositions;
      }
      instantiate(state, pos) {
        let text = [], lineStart = [pos];
        let lineObj = state.doc.lineAt(pos), baseIndent = /^\s*/.exec(lineObj.text)[0];
        for (let line of this.lines) {
          if (text.length) {
            let indent = baseIndent, tabs = /^\t*/.exec(line)[0].length;
            for (let i2 = 0; i2 < tabs; i2++)
              indent += state.facet(indentUnit);
            lineStart.push(pos + indent.length - tabs);
            line = indent + line.slice(tabs);
          }
          text.push(line);
          pos += line.length + 1;
        }
        let ranges = this.fieldPositions.map((pos2) => new FieldRange(pos2.field, lineStart[pos2.line] + pos2.from, lineStart[pos2.line] + pos2.to));
        return { text, ranges };
      }
      static parse(template3) {
        let fields = [];
        let lines = [], positions = [], m2;
        for (let line of template3.split(/\r\n?|\n/)) {
          while (m2 = /[#$]\{(?:(\d+)(?::([^}]*))?|([^}]*))\}/.exec(line)) {
            let seq = m2[1] ? +m2[1] : null, name2 = m2[2] || m2[3] || "", found = -1;
            for (let i2 = 0; i2 < fields.length; i2++) {
              if (seq != null ? fields[i2].seq == seq : name2 ? fields[i2].name == name2 : false)
                found = i2;
            }
            if (found < 0) {
              let i2 = 0;
              while (i2 < fields.length && (seq == null || fields[i2].seq != null && fields[i2].seq < seq))
                i2++;
              fields.splice(i2, 0, { seq, name: name2 });
              found = i2;
              for (let pos of positions)
                if (pos.field >= found)
                  pos.field++;
            }
            positions.push(new FieldPos(found, lines.length, m2.index, m2.index + name2.length));
            line = line.slice(0, m2.index) + name2 + line.slice(m2.index + m2[0].length);
          }
          lines.push(line);
        }
        return new Snippet(lines, positions);
      }
    };
    fieldMarker = /* @__PURE__ */ Decoration.widget({ widget: /* @__PURE__ */ new class extends WidgetType {
      toDOM() {
        let span = document.createElement("span");
        span.className = "cm-snippetFieldPosition";
        return span;
      }
      ignoreEvent() {
        return false;
      }
    }() });
    fieldRange = /* @__PURE__ */ Decoration.mark({ class: "cm-snippetField" });
    ActiveSnippet = class {
      constructor(ranges, active) {
        this.ranges = ranges;
        this.active = active;
        this.deco = Decoration.set(ranges.map((r2) => (r2.from == r2.to ? fieldMarker : fieldRange).range(r2.from, r2.to)));
      }
      map(changes) {
        return new ActiveSnippet(this.ranges.map((r2) => r2.map(changes)), this.active);
      }
      selectionInsideField(sel) {
        return sel.ranges.every((range2) => this.ranges.some((r2) => r2.field == this.active && r2.from <= range2.from && r2.to >= range2.to));
      }
    };
    setActive = /* @__PURE__ */ StateEffect.define({
      map(value, changes) {
        return value && value.map(changes);
      }
    });
    moveToField = /* @__PURE__ */ StateEffect.define();
    snippetState = /* @__PURE__ */ StateField.define({
      create() {
        return null;
      },
      update(value, tr) {
        for (let effect of tr.effects) {
          if (effect.is(setActive))
            return effect.value;
          if (effect.is(moveToField) && value)
            return new ActiveSnippet(value.ranges, effect.value);
        }
        if (value && tr.docChanged)
          value = value.map(tr.changes);
        if (value && tr.selection && !value.selectionInsideField(tr.selection))
          value = null;
        return value;
      },
      provide: (f3) => EditorView.decorations.from(f3, (val) => val ? val.deco : Decoration.none)
    });
    clearSnippet = ({ state, dispatch }) => {
      let active = state.field(snippetState, false);
      if (!active)
        return false;
      dispatch(state.update({ effects: setActive.of(null) }));
      return true;
    };
    nextSnippetField = /* @__PURE__ */ moveField(1);
    prevSnippetField = /* @__PURE__ */ moveField(-1);
    defaultSnippetKeymap = [
      { key: "Tab", run: nextSnippetField, shift: prevSnippetField },
      { key: "Escape", run: clearSnippet }
    ];
    snippetKeymap = /* @__PURE__ */ Facet.define({
      combine(maps) {
        return maps.length ? maps[0] : defaultSnippetKeymap;
      }
    });
    addSnippetKeymap = /* @__PURE__ */ Prec.highest(/* @__PURE__ */ keymap.compute([snippetKeymap], (state) => state.facet(snippetKeymap)));
    snippetPointerHandler = /* @__PURE__ */ EditorView.domEventHandlers({
      mousedown(event, view) {
        let active = view.state.field(snippetState, false), pos;
        if (!active || (pos = view.posAtCoords({ x: event.clientX, y: event.clientY })) == null)
          return false;
        let match = active.ranges.find((r2) => r2.from <= pos && r2.to >= pos);
        if (!match || match.field == active.active)
          return false;
        view.dispatch({
          selection: fieldSelection(active.ranges, match.field),
          effects: setActive.of(active.ranges.some((r2) => r2.field > match.field) ? new ActiveSnippet(active.ranges, match.field) : null)
        });
        return true;
      }
    });
  }
});

// node_modules/@codemirror/highlight/dist/index.js
function sameArray2(a, b) {
  return a.length == b.length && a.every((x2, i2) => x2 == b[i2]);
}
function permute(array) {
  let result = [array];
  for (let i2 = 0; i2 < array.length; i2++) {
    for (let a of permute(array.slice(0, i2).concat(array.slice(i2 + 1))))
      result.push(a);
  }
  return result;
}
function styleTags(spec) {
  let byName = Object.create(null);
  for (let prop in spec) {
    let tags2 = spec[prop];
    if (!Array.isArray(tags2))
      tags2 = [tags2];
    for (let part of prop.split(" "))
      if (part) {
        let pieces = [], mode = 2, rest = part;
        for (let pos = 0; ; ) {
          if (rest == "..." && pos > 0 && pos + 3 == part.length) {
            mode = 1;
            break;
          }
          let m2 = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(rest);
          if (!m2)
            throw new RangeError("Invalid path: " + part);
          pieces.push(m2[0] == "*" ? null : m2[0][0] == '"' ? JSON.parse(m2[0]) : m2[0]);
          pos += m2[0].length;
          if (pos == part.length)
            break;
          let next = part[pos++];
          if (pos == part.length && next == "!") {
            mode = 0;
            break;
          }
          if (next != "/")
            throw new RangeError("Invalid path: " + part);
          rest = part.slice(pos);
        }
        let last = pieces.length - 1, inner = pieces[last];
        if (!inner)
          throw new RangeError("Invalid path: " + part);
        let rule = new Rule(tags2, mode, last > 0 ? pieces.slice(0, last) : null);
        byName[inner] = rule.sort(byName[inner]);
      }
  }
  return ruleNodeProp.add(byName);
}
function getHighlightStyle(state) {
  return state.facet(highlightStyle) || state.facet(fallbackHighlightStyle);
}
function highlightTreeRange(tree, from, to, style, span) {
  let builder = new HighlightBuilder(from, style, span);
  builder.highlightRange(tree.cursor(), from, to, "", 0, tree.type);
  builder.flush(to);
}
function matchContext(context, stack, depth) {
  if (context.length > depth - 1)
    return false;
  for (let d = depth - 1, i2 = context.length - 1; i2 >= 0; i2--, d--) {
    let check = context[i2];
    if (check && check != stack[d])
      return false;
  }
  return true;
}
var nextTagID, Tag, nextModifierID, Modifier, ruleNodeProp, highlightStyle, fallbackHighlightStyle, Rule, HighlightStyle, TreeHighlighter, treeHighlighter, nodeStack, HighlightBuilder, t2, comment, name, typeName, propertyName, literal, string, number, content, heading, keyword, operator, punctuation, bracket, meta, tags, defaultHighlightStyle, classHighlightStyle;
var init_dist8 = __esm({
  "node_modules/@codemirror/highlight/dist/index.js"() {
    init_shims();
    init_dist5();
    init_style_mod();
    init_dist4();
    init_dist2();
    init_dist6();
    init_dist3();
    nextTagID = 0;
    Tag = class {
      constructor(set, base3, modified) {
        this.set = set;
        this.base = base3;
        this.modified = modified;
        this.id = nextTagID++;
      }
      static define(parent) {
        if (parent === null || parent === void 0 ? void 0 : parent.base)
          throw new Error("Can not derive from a modified tag");
        let tag = new Tag([], null, []);
        tag.set.push(tag);
        if (parent)
          for (let t3 of parent.set)
            tag.set.push(t3);
        return tag;
      }
      static defineModifier() {
        let mod = new Modifier();
        return (tag) => {
          if (tag.modified.indexOf(mod) > -1)
            return tag;
          return Modifier.get(tag.base || tag, tag.modified.concat(mod).sort((a, b) => a.id - b.id));
        };
      }
    };
    nextModifierID = 0;
    Modifier = class {
      constructor() {
        this.instances = [];
        this.id = nextModifierID++;
      }
      static get(base3, mods) {
        if (!mods.length)
          return base3;
        let exists = mods[0].instances.find((t3) => t3.base == base3 && sameArray2(mods, t3.modified));
        if (exists)
          return exists;
        let set = [], tag = new Tag(set, base3, mods);
        for (let m2 of mods)
          m2.instances.push(tag);
        let configs = permute(mods);
        for (let parent of base3.set)
          for (let config of configs)
            set.push(Modifier.get(parent, config));
        return tag;
      }
    };
    ruleNodeProp = /* @__PURE__ */ new NodeProp();
    highlightStyle = /* @__PURE__ */ Facet.define({
      combine(stylings) {
        return stylings.length ? HighlightStyle.combinedMatch(stylings) : null;
      }
    });
    fallbackHighlightStyle = /* @__PURE__ */ Facet.define({
      combine(values) {
        return values.length ? values[0].match : null;
      }
    });
    Rule = class {
      constructor(tags2, mode, context, next) {
        this.tags = tags2;
        this.mode = mode;
        this.context = context;
        this.next = next;
      }
      sort(other) {
        if (!other || other.depth < this.depth) {
          this.next = other;
          return this;
        }
        other.next = this.sort(other.next);
        return other;
      }
      get depth() {
        return this.context ? this.context.length : 0;
      }
    };
    HighlightStyle = class {
      constructor(spec, options2) {
        this.map = Object.create(null);
        let modSpec;
        function def(spec2) {
          let cls = StyleModule.newName();
          (modSpec || (modSpec = Object.create(null)))["." + cls] = spec2;
          return cls;
        }
        this.all = typeof options2.all == "string" ? options2.all : options2.all ? def(options2.all) : null;
        for (let style of spec) {
          let cls = (style.class || def(Object.assign({}, style, { tag: null }))) + (this.all ? " " + this.all : "");
          let tags2 = style.tag;
          if (!Array.isArray(tags2))
            this.map[tags2.id] = cls;
          else
            for (let tag of tags2)
              this.map[tag.id] = cls;
        }
        this.module = modSpec ? new StyleModule(modSpec) : null;
        this.scope = options2.scope || null;
        this.match = this.match.bind(this);
        let ext = [treeHighlighter];
        if (this.module)
          ext.push(EditorView.styleModule.of(this.module));
        this.extension = ext.concat(highlightStyle.of(this));
        this.fallback = ext.concat(fallbackHighlightStyle.of(this));
      }
      match(tag, scope) {
        if (this.scope && scope != this.scope)
          return null;
        for (let t3 of tag.set) {
          let match = this.map[t3.id];
          if (match !== void 0) {
            if (t3 != tag)
              this.map[tag.id] = match;
            return match;
          }
        }
        return this.map[tag.id] = this.all;
      }
      static combinedMatch(styles) {
        if (styles.length == 1)
          return styles[0].match;
        let cache = styles.some((s3) => s3.scope) ? void 0 : Object.create(null);
        return (tag, scope) => {
          let cached = cache && cache[tag.id];
          if (cached !== void 0)
            return cached;
          let result = null;
          for (let style of styles) {
            let value = style.match(tag, scope);
            if (value)
              result = result ? result + " " + value : value;
          }
          if (cache)
            cache[tag.id] = result;
          return result;
        };
      }
      static define(specs, options2) {
        return new HighlightStyle(specs, options2 || {});
      }
      static get(state, tag, scope) {
        let style = getHighlightStyle(state);
        return style && style(tag, scope || NodeType.none);
      }
    };
    TreeHighlighter = class {
      constructor(view) {
        this.markCache = Object.create(null);
        this.tree = syntaxTree(view.state);
        this.decorations = this.buildDeco(view, getHighlightStyle(view.state));
      }
      update(update) {
        let tree = syntaxTree(update.state), style = getHighlightStyle(update.state);
        let styleChange = style != update.startState.facet(highlightStyle);
        if (tree.length < update.view.viewport.to && !styleChange && tree.type == this.tree.type) {
          this.decorations = this.decorations.map(update.changes);
        } else if (tree != this.tree || update.viewportChanged || styleChange) {
          this.tree = tree;
          this.decorations = this.buildDeco(update.view, style);
        }
      }
      buildDeco(view, match) {
        if (!match || !this.tree.length)
          return Decoration.none;
        let builder = new RangeSetBuilder();
        for (let { from, to } of view.visibleRanges) {
          highlightTreeRange(this.tree, from, to, match, (from2, to2, style) => {
            builder.add(from2, to2, this.markCache[style] || (this.markCache[style] = Decoration.mark({ class: style })));
          });
        }
        return builder.finish();
      }
    };
    treeHighlighter = /* @__PURE__ */ Prec.extend(/* @__PURE__ */ ViewPlugin.fromClass(TreeHighlighter, {
      decorations: (v) => v.decorations
    }));
    nodeStack = [""];
    HighlightBuilder = class {
      constructor(at, style, span) {
        this.at = at;
        this.style = style;
        this.span = span;
        this.class = "";
      }
      startSpan(at, cls) {
        if (cls != this.class) {
          this.flush(at);
          if (at > this.at)
            this.at = at;
          this.class = cls;
        }
      }
      flush(to) {
        if (to > this.at && this.class)
          this.span(this.at, to, this.class);
      }
      highlightRange(cursor, from, to, inheritedClass, depth, scope) {
        let { type, from: start, to: end } = cursor;
        if (start >= to || end <= from)
          return;
        nodeStack[depth] = type.name;
        if (type.isTop)
          scope = type;
        let cls = inheritedClass;
        let rule = type.prop(ruleNodeProp), opaque = false;
        while (rule) {
          if (!rule.context || matchContext(rule.context, nodeStack, depth)) {
            for (let tag of rule.tags) {
              let st = this.style(tag, scope);
              if (st) {
                if (cls)
                  cls += " ";
                cls += st;
                if (rule.mode == 1)
                  inheritedClass += (inheritedClass ? " " : "") + st;
                else if (rule.mode == 0)
                  opaque = true;
              }
            }
            break;
          }
          rule = rule.next;
        }
        this.startSpan(cursor.from, cls);
        if (opaque)
          return;
        let mounted = cursor.tree && cursor.tree.prop(NodeProp.mounted);
        if (mounted && mounted.overlay) {
          let inner = cursor.node.enter(mounted.overlay[0].from + start, 1);
          let hasChild2 = cursor.firstChild();
          for (let i2 = 0, pos = start; ; i2++) {
            let next = i2 < mounted.overlay.length ? mounted.overlay[i2] : null;
            let nextPos = next ? next.from + start : end;
            let rangeFrom = Math.max(from, pos), rangeTo = Math.min(to, nextPos);
            if (rangeFrom < rangeTo && hasChild2) {
              while (cursor.from < rangeTo) {
                this.highlightRange(cursor, rangeFrom, rangeTo, inheritedClass, depth + 1, scope);
                this.startSpan(Math.min(to, cursor.to), cls);
                if (cursor.to >= nextPos || !cursor.nextSibling())
                  break;
              }
            }
            if (!next || nextPos > to)
              break;
            pos = next.to + start;
            if (pos > from) {
              this.highlightRange(inner.cursor, Math.max(from, next.from + start), Math.min(to, pos), inheritedClass, depth, mounted.tree.type);
              this.startSpan(pos, cls);
            }
          }
          if (hasChild2)
            cursor.parent();
        } else if (cursor.firstChild()) {
          do {
            if (cursor.to <= from)
              continue;
            if (cursor.from >= to)
              break;
            this.highlightRange(cursor, from, to, inheritedClass, depth + 1, scope);
            this.startSpan(Math.min(to, cursor.to), cls);
          } while (cursor.nextSibling());
          cursor.parent();
        }
      }
    };
    t2 = Tag.define;
    comment = /* @__PURE__ */ t2();
    name = /* @__PURE__ */ t2();
    typeName = /* @__PURE__ */ t2(name);
    propertyName = /* @__PURE__ */ t2(name);
    literal = /* @__PURE__ */ t2();
    string = /* @__PURE__ */ t2(literal);
    number = /* @__PURE__ */ t2(literal);
    content = /* @__PURE__ */ t2();
    heading = /* @__PURE__ */ t2(content);
    keyword = /* @__PURE__ */ t2();
    operator = /* @__PURE__ */ t2();
    punctuation = /* @__PURE__ */ t2();
    bracket = /* @__PURE__ */ t2(punctuation);
    meta = /* @__PURE__ */ t2();
    tags = {
      comment,
      lineComment: /* @__PURE__ */ t2(comment),
      blockComment: /* @__PURE__ */ t2(comment),
      docComment: /* @__PURE__ */ t2(comment),
      name,
      variableName: /* @__PURE__ */ t2(name),
      typeName,
      tagName: /* @__PURE__ */ t2(typeName),
      propertyName,
      attributeName: /* @__PURE__ */ t2(propertyName),
      className: /* @__PURE__ */ t2(name),
      labelName: /* @__PURE__ */ t2(name),
      namespace: /* @__PURE__ */ t2(name),
      macroName: /* @__PURE__ */ t2(name),
      literal,
      string,
      docString: /* @__PURE__ */ t2(string),
      character: /* @__PURE__ */ t2(string),
      attributeValue: /* @__PURE__ */ t2(string),
      number,
      integer: /* @__PURE__ */ t2(number),
      float: /* @__PURE__ */ t2(number),
      bool: /* @__PURE__ */ t2(literal),
      regexp: /* @__PURE__ */ t2(literal),
      escape: /* @__PURE__ */ t2(literal),
      color: /* @__PURE__ */ t2(literal),
      url: /* @__PURE__ */ t2(literal),
      keyword,
      self: /* @__PURE__ */ t2(keyword),
      null: /* @__PURE__ */ t2(keyword),
      atom: /* @__PURE__ */ t2(keyword),
      unit: /* @__PURE__ */ t2(keyword),
      modifier: /* @__PURE__ */ t2(keyword),
      operatorKeyword: /* @__PURE__ */ t2(keyword),
      controlKeyword: /* @__PURE__ */ t2(keyword),
      definitionKeyword: /* @__PURE__ */ t2(keyword),
      operator,
      derefOperator: /* @__PURE__ */ t2(operator),
      arithmeticOperator: /* @__PURE__ */ t2(operator),
      logicOperator: /* @__PURE__ */ t2(operator),
      bitwiseOperator: /* @__PURE__ */ t2(operator),
      compareOperator: /* @__PURE__ */ t2(operator),
      updateOperator: /* @__PURE__ */ t2(operator),
      definitionOperator: /* @__PURE__ */ t2(operator),
      typeOperator: /* @__PURE__ */ t2(operator),
      controlOperator: /* @__PURE__ */ t2(operator),
      punctuation,
      separator: /* @__PURE__ */ t2(punctuation),
      bracket,
      angleBracket: /* @__PURE__ */ t2(bracket),
      squareBracket: /* @__PURE__ */ t2(bracket),
      paren: /* @__PURE__ */ t2(bracket),
      brace: /* @__PURE__ */ t2(bracket),
      content,
      heading,
      heading1: /* @__PURE__ */ t2(heading),
      heading2: /* @__PURE__ */ t2(heading),
      heading3: /* @__PURE__ */ t2(heading),
      heading4: /* @__PURE__ */ t2(heading),
      heading5: /* @__PURE__ */ t2(heading),
      heading6: /* @__PURE__ */ t2(heading),
      contentSeparator: /* @__PURE__ */ t2(content),
      list: /* @__PURE__ */ t2(content),
      quote: /* @__PURE__ */ t2(content),
      emphasis: /* @__PURE__ */ t2(content),
      strong: /* @__PURE__ */ t2(content),
      link: /* @__PURE__ */ t2(content),
      monospace: /* @__PURE__ */ t2(content),
      strikethrough: /* @__PURE__ */ t2(content),
      inserted: /* @__PURE__ */ t2(),
      deleted: /* @__PURE__ */ t2(),
      changed: /* @__PURE__ */ t2(),
      invalid: /* @__PURE__ */ t2(),
      meta,
      documentMeta: /* @__PURE__ */ t2(meta),
      annotation: /* @__PURE__ */ t2(meta),
      processingInstruction: /* @__PURE__ */ t2(meta),
      definition: /* @__PURE__ */ Tag.defineModifier(),
      constant: /* @__PURE__ */ Tag.defineModifier(),
      function: /* @__PURE__ */ Tag.defineModifier(),
      standard: /* @__PURE__ */ Tag.defineModifier(),
      local: /* @__PURE__ */ Tag.defineModifier(),
      special: /* @__PURE__ */ Tag.defineModifier()
    };
    defaultHighlightStyle = /* @__PURE__ */ HighlightStyle.define([
      {
        tag: tags.link,
        textDecoration: "underline"
      },
      {
        tag: tags.heading,
        textDecoration: "underline",
        fontWeight: "bold"
      },
      {
        tag: tags.emphasis,
        fontStyle: "italic"
      },
      {
        tag: tags.strong,
        fontWeight: "bold"
      },
      {
        tag: tags.strikethrough,
        textDecoration: "line-through"
      },
      {
        tag: tags.keyword,
        color: "#708"
      },
      {
        tag: [tags.atom, tags.bool, tags.url, tags.contentSeparator, tags.labelName],
        color: "#219"
      },
      {
        tag: [tags.literal, tags.inserted],
        color: "#164"
      },
      {
        tag: [tags.string, tags.deleted],
        color: "#a11"
      },
      {
        tag: [tags.regexp, tags.escape, /* @__PURE__ */ tags.special(tags.string)],
        color: "#e40"
      },
      {
        tag: /* @__PURE__ */ tags.definition(tags.variableName),
        color: "#00f"
      },
      {
        tag: /* @__PURE__ */ tags.local(tags.variableName),
        color: "#30a"
      },
      {
        tag: [tags.typeName, tags.namespace],
        color: "#085"
      },
      {
        tag: tags.className,
        color: "#167"
      },
      {
        tag: [/* @__PURE__ */ tags.special(tags.variableName), tags.macroName],
        color: "#256"
      },
      {
        tag: /* @__PURE__ */ tags.definition(tags.propertyName),
        color: "#00c"
      },
      {
        tag: tags.comment,
        color: "#940"
      },
      {
        tag: tags.meta,
        color: "#7a757a"
      },
      {
        tag: tags.invalid,
        color: "#f00"
      }
    ]);
    classHighlightStyle = /* @__PURE__ */ HighlightStyle.define([
      { tag: tags.link, class: "cmt-link" },
      { tag: tags.heading, class: "cmt-heading" },
      { tag: tags.emphasis, class: "cmt-emphasis" },
      { tag: tags.strong, class: "cmt-strong" },
      { tag: tags.keyword, class: "cmt-keyword" },
      { tag: tags.atom, class: "cmt-atom" },
      { tag: tags.bool, class: "cmt-bool" },
      { tag: tags.url, class: "cmt-url" },
      { tag: tags.labelName, class: "cmt-labelName" },
      { tag: tags.inserted, class: "cmt-inserted" },
      { tag: tags.deleted, class: "cmt-deleted" },
      { tag: tags.literal, class: "cmt-literal" },
      { tag: tags.string, class: "cmt-string" },
      { tag: tags.number, class: "cmt-number" },
      { tag: [tags.regexp, tags.escape, /* @__PURE__ */ tags.special(tags.string)], class: "cmt-string2" },
      { tag: tags.variableName, class: "cmt-variableName" },
      { tag: /* @__PURE__ */ tags.local(tags.variableName), class: "cmt-variableName cmt-local" },
      { tag: /* @__PURE__ */ tags.definition(tags.variableName), class: "cmt-variableName cmt-definition" },
      { tag: /* @__PURE__ */ tags.special(tags.variableName), class: "cmt-variableName2" },
      { tag: tags.typeName, class: "cmt-typeName" },
      { tag: tags.namespace, class: "cmt-namespace" },
      { tag: tags.macroName, class: "cmt-macroName" },
      { tag: tags.propertyName, class: "cmt-propertyName" },
      { tag: tags.operator, class: "cmt-operator" },
      { tag: tags.comment, class: "cmt-comment" },
      { tag: tags.meta, class: "cmt-meta" },
      { tag: tags.invalid, class: "cmt-invalid" },
      { tag: tags.punctuation, class: "cmt-punctuation" }
    ]);
  }
});

// node_modules/@lezer/lr/dist/index.js
function readToken(data, input, stack, group) {
  let state = 0, groupMask = 1 << group, { parser: parser2 } = stack.p, { dialect } = parser2;
  scan:
    for (; ; ) {
      if ((groupMask & data[state]) == 0)
        break;
      let accEnd = data[state + 1];
      for (let i2 = state + 3; i2 < accEnd; i2 += 2)
        if ((data[i2 + 1] & groupMask) > 0) {
          let term = data[i2];
          if (dialect.allows(term) && (input.token.value == -1 || input.token.value == term || parser2.overrides(term, input.token.value))) {
            input.acceptToken(term);
            break;
          }
        }
      for (let next = input.next, low = 0, high = data[state + 2]; low < high; ) {
        let mid = low + high >> 1;
        let index2 = accEnd + mid + (mid << 1);
        let from = data[index2], to = data[index2 + 1];
        if (next < from)
          high = mid;
        else if (next >= to)
          low = mid + 1;
        else {
          state = data[index2 + 2];
          input.advance();
          continue scan;
        }
      }
      break;
    }
}
function decodeArray(input, Type = Uint16Array) {
  if (typeof input != "string")
    return input;
  let array = null;
  for (let pos = 0, out = 0; pos < input.length; ) {
    let value = 0;
    for (; ; ) {
      let next = input.charCodeAt(pos++), stop = false;
      if (next == 126) {
        value = 65535;
        break;
      }
      if (next >= 92)
        next--;
      if (next >= 34)
        next--;
      let digit = next - 32;
      if (digit >= 46) {
        digit -= 46;
        stop = true;
      }
      value += digit;
      if (stop)
        break;
      value *= 46;
    }
    if (array)
      array[out++] = value;
    else
      array = new Type(value);
  }
  return array;
}
function cutAt(tree, pos, side) {
  let cursor = tree.fullCursor();
  cursor.moveTo(pos);
  for (; ; ) {
    if (!(side < 0 ? cursor.childBefore(pos) : cursor.childAfter(pos)))
      for (; ; ) {
        if ((side < 0 ? cursor.to < pos : cursor.from > pos) && !cursor.type.isError)
          return side < 0 ? Math.max(0, Math.min(cursor.to - 1, pos - 25)) : Math.min(tree.length, Math.max(cursor.from + 1, pos + 25));
        if (side < 0 ? cursor.prevSibling() : cursor.nextSibling())
          break;
        if (!cursor.parent())
          return side < 0 ? 0 : tree.length;
      }
  }
}
function pushStackDedup(stack, newStacks) {
  for (let i2 = 0; i2 < newStacks.length; i2++) {
    let other = newStacks[i2];
    if (other.pos == stack.pos && other.sameState(stack)) {
      if (newStacks[i2].score < stack.score)
        newStacks[i2] = stack;
      return;
    }
  }
  newStacks.push(stack);
}
function pair(data, off) {
  return data[off] | data[off + 1] << 16;
}
function findOffset(data, start, term) {
  for (let i2 = start, next; (next = data[i2]) != 65535; i2++)
    if (next == term)
      return i2 - start;
  return -1;
}
function findFinished(stacks) {
  let best = null;
  for (let stack of stacks) {
    let stopped = stack.p.stoppedAt;
    if ((stack.pos == stack.p.stream.end || stopped != null && stack.pos > stopped) && stack.p.parser.stateFlag(stack.state, 2) && (!best || best.score < stack.score))
      best = stack;
  }
  return best;
}
var Stack, StackContext, Recover, SimulatedStack, StackBufferCursor, CachedToken, nullToken, InputStream, TokenGroup, ExternalTokenizer, verbose, stackIDs, Safety, FragmentCursor, TokenCache, Rec, Parse, Dialect, id, ContextTracker, LRParser;
var init_dist9 = __esm({
  "node_modules/@lezer/lr/dist/index.js"() {
    init_shims();
    init_dist5();
    Stack = class {
      constructor(p, stack, state, reducePos, pos, score, buffer, bufferBase, curContext, lookAhead = 0, parent) {
        this.p = p;
        this.stack = stack;
        this.state = state;
        this.reducePos = reducePos;
        this.pos = pos;
        this.score = score;
        this.buffer = buffer;
        this.bufferBase = bufferBase;
        this.curContext = curContext;
        this.lookAhead = lookAhead;
        this.parent = parent;
      }
      toString() {
        return `[${this.stack.filter((_, i2) => i2 % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
      }
      static start(p, state, pos = 0) {
        let cx = p.parser.context;
        return new Stack(p, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, 0, null);
      }
      get context() {
        return this.curContext ? this.curContext.context : null;
      }
      pushState(state, start) {
        this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
        this.state = state;
      }
      reduce(action) {
        let depth = action >> 19, type = action & 65535;
        let { parser: parser2 } = this.p;
        let dPrec = parser2.dynamicPrecedence(type);
        if (dPrec)
          this.score += dPrec;
        if (depth == 0) {
          if (type < parser2.minRepeatTerm)
            this.storeNode(type, this.reducePos, this.reducePos, 4, true);
          this.pushState(parser2.getGoto(this.state, type, true), this.reducePos);
          this.reduceContext(type, this.reducePos);
          return;
        }
        let base3 = this.stack.length - (depth - 1) * 3 - (action & 262144 ? 6 : 0);
        let start = this.stack[base3 - 2];
        let bufferBase = this.stack[base3 - 1], count = this.bufferBase + this.buffer.length - bufferBase;
        if (type < parser2.minRepeatTerm || action & 131072) {
          let pos = parser2.stateFlag(this.state, 1) ? this.pos : this.reducePos;
          this.storeNode(type, start, pos, count + 4, true);
        }
        if (action & 262144) {
          this.state = this.stack[base3];
        } else {
          let baseStateID = this.stack[base3 - 3];
          this.state = parser2.getGoto(baseStateID, type, true);
        }
        while (this.stack.length > base3)
          this.stack.pop();
        this.reduceContext(type, start);
      }
      storeNode(term, start, end, size = 4, isReduce = false) {
        if (term == 0) {
          let cur = this, top2 = this.buffer.length;
          if (top2 == 0 && cur.parent) {
            top2 = cur.bufferBase - cur.parent.bufferBase;
            cur = cur.parent;
          }
          if (top2 > 0 && cur.buffer[top2 - 4] == 0 && cur.buffer[top2 - 1] > -1) {
            if (start == end)
              return;
            if (cur.buffer[top2 - 2] >= start) {
              cur.buffer[top2 - 2] = end;
              return;
            }
          }
        }
        if (!isReduce || this.pos == end) {
          this.buffer.push(term, start, end, size);
        } else {
          let index2 = this.buffer.length;
          if (index2 > 0 && this.buffer[index2 - 4] != 0)
            while (index2 > 0 && this.buffer[index2 - 2] > end) {
              this.buffer[index2] = this.buffer[index2 - 4];
              this.buffer[index2 + 1] = this.buffer[index2 - 3];
              this.buffer[index2 + 2] = this.buffer[index2 - 2];
              this.buffer[index2 + 3] = this.buffer[index2 - 1];
              index2 -= 4;
              if (size > 4)
                size -= 4;
            }
          this.buffer[index2] = term;
          this.buffer[index2 + 1] = start;
          this.buffer[index2 + 2] = end;
          this.buffer[index2 + 3] = size;
        }
      }
      shift(action, next, nextEnd) {
        let start = this.pos;
        if (action & 131072) {
          this.pushState(action & 65535, this.pos);
        } else if ((action & 262144) == 0) {
          let nextState = action, { parser: parser2 } = this.p;
          if (nextEnd > this.pos || next <= parser2.maxNode) {
            this.pos = nextEnd;
            if (!parser2.stateFlag(nextState, 1))
              this.reducePos = nextEnd;
          }
          this.pushState(nextState, start);
          this.shiftContext(next, start);
          if (next <= parser2.maxNode)
            this.buffer.push(next, start, nextEnd, 4);
        } else {
          this.pos = nextEnd;
          this.shiftContext(next, start);
          if (next <= this.p.parser.maxNode)
            this.buffer.push(next, start, nextEnd, 4);
        }
      }
      apply(action, next, nextEnd) {
        if (action & 65536)
          this.reduce(action);
        else
          this.shift(action, next, nextEnd);
      }
      useNode(value, next) {
        let index2 = this.p.reused.length - 1;
        if (index2 < 0 || this.p.reused[index2] != value) {
          this.p.reused.push(value);
          index2++;
        }
        let start = this.pos;
        this.reducePos = this.pos = start + value.length;
        this.pushState(next, start);
        this.buffer.push(index2, start, this.reducePos, -1);
        if (this.curContext)
          this.updateContext(this.curContext.tracker.reuse(this.curContext.context, value, this, this.p.stream.reset(this.pos - value.length)));
      }
      split() {
        let parent = this;
        let off = parent.buffer.length;
        while (off > 0 && parent.buffer[off - 2] > parent.reducePos)
          off -= 4;
        let buffer = parent.buffer.slice(off), base3 = parent.bufferBase + off;
        while (parent && base3 == parent.bufferBase)
          parent = parent.parent;
        return new Stack(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, buffer, base3, this.curContext, this.lookAhead, parent);
      }
      recoverByDelete(next, nextEnd) {
        let isNode = next <= this.p.parser.maxNode;
        if (isNode)
          this.storeNode(next, this.pos, nextEnd, 4);
        this.storeNode(0, this.pos, nextEnd, isNode ? 8 : 4);
        this.pos = this.reducePos = nextEnd;
        this.score -= 190;
      }
      canShift(term) {
        for (let sim = new SimulatedStack(this); ; ) {
          let action = this.p.parser.stateSlot(sim.state, 4) || this.p.parser.hasAction(sim.state, term);
          if ((action & 65536) == 0)
            return true;
          if (action == 0)
            return false;
          sim.reduce(action);
        }
      }
      recoverByInsert(next) {
        if (this.stack.length >= 300)
          return [];
        let nextStates = this.p.parser.nextStates(this.state);
        if (nextStates.length > 4 << 1 || this.stack.length >= 120) {
          let best = [];
          for (let i2 = 0, s3; i2 < nextStates.length; i2 += 2) {
            if ((s3 = nextStates[i2 + 1]) != this.state && this.p.parser.hasAction(s3, next))
              best.push(nextStates[i2], s3);
          }
          if (this.stack.length < 120)
            for (let i2 = 0; best.length < 4 << 1 && i2 < nextStates.length; i2 += 2) {
              let s3 = nextStates[i2 + 1];
              if (!best.some((v, i3) => i3 & 1 && v == s3))
                best.push(nextStates[i2], s3);
            }
          nextStates = best;
        }
        let result = [];
        for (let i2 = 0; i2 < nextStates.length && result.length < 4; i2 += 2) {
          let s3 = nextStates[i2 + 1];
          if (s3 == this.state)
            continue;
          let stack = this.split();
          stack.storeNode(0, stack.pos, stack.pos, 4, true);
          stack.pushState(s3, this.pos);
          stack.shiftContext(nextStates[i2], this.pos);
          stack.score -= 200;
          result.push(stack);
        }
        return result;
      }
      forceReduce() {
        let reduce = this.p.parser.stateSlot(this.state, 5);
        if ((reduce & 65536) == 0)
          return false;
        let { parser: parser2 } = this.p;
        if (!parser2.validAction(this.state, reduce)) {
          let depth = reduce >> 19, term = reduce & 65535;
          let target = this.stack.length - depth * 3;
          if (target < 0 || parser2.getGoto(this.stack[target], term, false) < 0)
            return false;
          this.storeNode(0, this.reducePos, this.reducePos, 4, true);
          this.score -= 100;
        }
        this.reduce(reduce);
        return true;
      }
      forceAll() {
        while (!this.p.parser.stateFlag(this.state, 2)) {
          if (!this.forceReduce()) {
            this.storeNode(0, this.pos, this.pos, 4, true);
            break;
          }
        }
        return this;
      }
      get deadEnd() {
        if (this.stack.length != 3)
          return false;
        let { parser: parser2 } = this.p;
        return parser2.data[parser2.stateSlot(this.state, 1)] == 65535 && !parser2.stateSlot(this.state, 4);
      }
      restart() {
        this.state = this.stack[0];
        this.stack.length = 0;
      }
      sameState(other) {
        if (this.state != other.state || this.stack.length != other.stack.length)
          return false;
        for (let i2 = 0; i2 < this.stack.length; i2 += 3)
          if (this.stack[i2] != other.stack[i2])
            return false;
        return true;
      }
      get parser() {
        return this.p.parser;
      }
      dialectEnabled(dialectID) {
        return this.p.parser.dialect.flags[dialectID];
      }
      shiftContext(term, start) {
        if (this.curContext)
          this.updateContext(this.curContext.tracker.shift(this.curContext.context, term, this, this.p.stream.reset(start)));
      }
      reduceContext(term, start) {
        if (this.curContext)
          this.updateContext(this.curContext.tracker.reduce(this.curContext.context, term, this, this.p.stream.reset(start)));
      }
      emitContext() {
        let last = this.buffer.length - 1;
        if (last < 0 || this.buffer[last] != -3)
          this.buffer.push(this.curContext.hash, this.reducePos, this.reducePos, -3);
      }
      emitLookAhead() {
        let last = this.buffer.length - 1;
        if (last < 0 || this.buffer[last] != -4)
          this.buffer.push(this.lookAhead, this.reducePos, this.reducePos, -4);
      }
      updateContext(context) {
        if (context != this.curContext.context) {
          let newCx = new StackContext(this.curContext.tracker, context);
          if (newCx.hash != this.curContext.hash)
            this.emitContext();
          this.curContext = newCx;
        }
      }
      setLookAhead(lookAhead) {
        if (lookAhead > this.lookAhead) {
          this.emitLookAhead();
          this.lookAhead = lookAhead;
        }
      }
      close() {
        if (this.curContext && this.curContext.tracker.strict)
          this.emitContext();
        if (this.lookAhead > 0)
          this.emitLookAhead();
      }
    };
    StackContext = class {
      constructor(tracker, context) {
        this.tracker = tracker;
        this.context = context;
        this.hash = tracker.strict ? tracker.hash(context) : 0;
      }
    };
    (function(Recover2) {
      Recover2[Recover2["Insert"] = 200] = "Insert";
      Recover2[Recover2["Delete"] = 190] = "Delete";
      Recover2[Recover2["Reduce"] = 100] = "Reduce";
      Recover2[Recover2["MaxNext"] = 4] = "MaxNext";
      Recover2[Recover2["MaxInsertStackDepth"] = 300] = "MaxInsertStackDepth";
      Recover2[Recover2["DampenInsertStackDepth"] = 120] = "DampenInsertStackDepth";
    })(Recover || (Recover = {}));
    SimulatedStack = class {
      constructor(start) {
        this.start = start;
        this.state = start.state;
        this.stack = start.stack;
        this.base = this.stack.length;
      }
      reduce(action) {
        let term = action & 65535, depth = action >> 19;
        if (depth == 0) {
          if (this.stack == this.start.stack)
            this.stack = this.stack.slice();
          this.stack.push(this.state, 0, 0);
          this.base += 3;
        } else {
          this.base -= (depth - 1) * 3;
        }
        let goto = this.start.p.parser.getGoto(this.stack[this.base - 3], term, true);
        this.state = goto;
      }
    };
    StackBufferCursor = class {
      constructor(stack, pos, index2) {
        this.stack = stack;
        this.pos = pos;
        this.index = index2;
        this.buffer = stack.buffer;
        if (this.index == 0)
          this.maybeNext();
      }
      static create(stack, pos = stack.bufferBase + stack.buffer.length) {
        return new StackBufferCursor(stack, pos, pos - stack.bufferBase);
      }
      maybeNext() {
        let next = this.stack.parent;
        if (next != null) {
          this.index = this.stack.bufferBase - next.bufferBase;
          this.stack = next;
          this.buffer = next.buffer;
        }
      }
      get id() {
        return this.buffer[this.index - 4];
      }
      get start() {
        return this.buffer[this.index - 3];
      }
      get end() {
        return this.buffer[this.index - 2];
      }
      get size() {
        return this.buffer[this.index - 1];
      }
      next() {
        this.index -= 4;
        this.pos -= 4;
        if (this.index == 0)
          this.maybeNext();
      }
      fork() {
        return new StackBufferCursor(this.stack, this.pos, this.index);
      }
    };
    CachedToken = class {
      constructor() {
        this.start = -1;
        this.value = -1;
        this.end = -1;
        this.extended = -1;
        this.lookAhead = 0;
        this.mask = 0;
        this.context = 0;
      }
    };
    nullToken = new CachedToken();
    InputStream = class {
      constructor(input, ranges) {
        this.input = input;
        this.ranges = ranges;
        this.chunk = "";
        this.chunkOff = 0;
        this.chunk2 = "";
        this.chunk2Pos = 0;
        this.next = -1;
        this.token = nullToken;
        this.rangeIndex = 0;
        this.pos = this.chunkPos = ranges[0].from;
        this.range = ranges[0];
        this.end = ranges[ranges.length - 1].to;
        this.readNext();
      }
      resolveOffset(offset, assoc) {
        let range2 = this.range, index2 = this.rangeIndex;
        let pos = this.pos + offset;
        while (pos < range2.from) {
          if (!index2)
            return null;
          let next = this.ranges[--index2];
          pos -= range2.from - next.to;
          range2 = next;
        }
        while (assoc < 0 ? pos > range2.to : pos >= range2.to) {
          if (index2 == this.ranges.length - 1)
            return null;
          let next = this.ranges[++index2];
          pos += next.from - range2.to;
          range2 = next;
        }
        return pos;
      }
      peek(offset) {
        let idx = this.chunkOff + offset, pos, result;
        if (idx >= 0 && idx < this.chunk.length) {
          pos = this.pos + offset;
          result = this.chunk.charCodeAt(idx);
        } else {
          let resolved = this.resolveOffset(offset, 1);
          if (resolved == null)
            return -1;
          pos = resolved;
          if (pos >= this.chunk2Pos && pos < this.chunk2Pos + this.chunk2.length) {
            result = this.chunk2.charCodeAt(pos - this.chunk2Pos);
          } else {
            let i2 = this.rangeIndex, range2 = this.range;
            while (range2.to <= pos)
              range2 = this.ranges[++i2];
            this.chunk2 = this.input.chunk(this.chunk2Pos = pos);
            if (pos + this.chunk2.length > range2.to)
              this.chunk2 = this.chunk2.slice(0, range2.to - pos);
            result = this.chunk2.charCodeAt(0);
          }
        }
        if (pos >= this.token.lookAhead)
          this.token.lookAhead = pos + 1;
        return result;
      }
      acceptToken(token, endOffset = 0) {
        let end = endOffset ? this.resolveOffset(endOffset, -1) : this.pos;
        if (end == null || end < this.token.start)
          throw new RangeError("Token end out of bounds");
        this.token.value = token;
        this.token.end = end;
      }
      getChunk() {
        if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
          let { chunk, chunkPos } = this;
          this.chunk = this.chunk2;
          this.chunkPos = this.chunk2Pos;
          this.chunk2 = chunk;
          this.chunk2Pos = chunkPos;
          this.chunkOff = this.pos - this.chunkPos;
        } else {
          this.chunk2 = this.chunk;
          this.chunk2Pos = this.chunkPos;
          let nextChunk = this.input.chunk(this.pos);
          let end = this.pos + nextChunk.length;
          this.chunk = end > this.range.to ? nextChunk.slice(0, this.range.to - this.pos) : nextChunk;
          this.chunkPos = this.pos;
          this.chunkOff = 0;
        }
      }
      readNext() {
        if (this.chunkOff >= this.chunk.length) {
          this.getChunk();
          if (this.chunkOff == this.chunk.length)
            return this.next = -1;
        }
        return this.next = this.chunk.charCodeAt(this.chunkOff);
      }
      advance(n = 1) {
        this.chunkOff += n;
        while (this.pos + n >= this.range.to) {
          if (this.rangeIndex == this.ranges.length - 1)
            return this.setDone();
          n -= this.range.to - this.pos;
          this.range = this.ranges[++this.rangeIndex];
          this.pos = this.range.from;
        }
        this.pos += n;
        if (this.pos >= this.token.lookAhead)
          this.token.lookAhead = this.pos + 1;
        return this.readNext();
      }
      setDone() {
        this.pos = this.chunkPos = this.end;
        this.range = this.ranges[this.rangeIndex = this.ranges.length - 1];
        this.chunk = "";
        return this.next = -1;
      }
      reset(pos, token) {
        if (token) {
          this.token = token;
          token.start = pos;
          token.lookAhead = pos + 1;
          token.value = token.extended = -1;
        } else {
          this.token = nullToken;
        }
        if (this.pos != pos) {
          this.pos = pos;
          if (pos == this.end) {
            this.setDone();
            return this;
          }
          while (pos < this.range.from)
            this.range = this.ranges[--this.rangeIndex];
          while (pos >= this.range.to)
            this.range = this.ranges[++this.rangeIndex];
          if (pos >= this.chunkPos && pos < this.chunkPos + this.chunk.length) {
            this.chunkOff = pos - this.chunkPos;
          } else {
            this.chunk = "";
            this.chunkOff = 0;
          }
          this.readNext();
        }
        return this;
      }
      read(from, to) {
        if (from >= this.chunkPos && to <= this.chunkPos + this.chunk.length)
          return this.chunk.slice(from - this.chunkPos, to - this.chunkPos);
        if (from >= this.range.from && to <= this.range.to)
          return this.input.read(from, to);
        let result = "";
        for (let r2 of this.ranges) {
          if (r2.from >= to)
            break;
          if (r2.to > from)
            result += this.input.read(Math.max(r2.from, from), Math.min(r2.to, to));
        }
        return result;
      }
    };
    TokenGroup = class {
      constructor(data, id2) {
        this.data = data;
        this.id = id2;
      }
      token(input, stack) {
        readToken(this.data, input, stack, this.id);
      }
    };
    TokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
    ExternalTokenizer = class {
      constructor(token, options2 = {}) {
        this.token = token;
        this.contextual = !!options2.contextual;
        this.fallback = !!options2.fallback;
        this.extend = !!options2.extend;
      }
    };
    verbose = typeof process != "undefined" && /\bparse\b/.test(process.env.LOG);
    stackIDs = null;
    (function(Safety2) {
      Safety2[Safety2["Margin"] = 25] = "Margin";
    })(Safety || (Safety = {}));
    FragmentCursor = class {
      constructor(fragments, nodeSet) {
        this.fragments = fragments;
        this.nodeSet = nodeSet;
        this.i = 0;
        this.fragment = null;
        this.safeFrom = -1;
        this.safeTo = -1;
        this.trees = [];
        this.start = [];
        this.index = [];
        this.nextFragment();
      }
      nextFragment() {
        let fr = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
        if (fr) {
          this.safeFrom = fr.openStart ? cutAt(fr.tree, fr.from + fr.offset, 1) - fr.offset : fr.from;
          this.safeTo = fr.openEnd ? cutAt(fr.tree, fr.to + fr.offset, -1) - fr.offset : fr.to;
          while (this.trees.length) {
            this.trees.pop();
            this.start.pop();
            this.index.pop();
          }
          this.trees.push(fr.tree);
          this.start.push(-fr.offset);
          this.index.push(0);
          this.nextStart = this.safeFrom;
        } else {
          this.nextStart = 1e9;
        }
      }
      nodeAt(pos) {
        if (pos < this.nextStart)
          return null;
        while (this.fragment && this.safeTo <= pos)
          this.nextFragment();
        if (!this.fragment)
          return null;
        for (; ; ) {
          let last = this.trees.length - 1;
          if (last < 0) {
            this.nextFragment();
            return null;
          }
          let top2 = this.trees[last], index2 = this.index[last];
          if (index2 == top2.children.length) {
            this.trees.pop();
            this.start.pop();
            this.index.pop();
            continue;
          }
          let next = top2.children[index2];
          let start = this.start[last] + top2.positions[index2];
          if (start > pos) {
            this.nextStart = start;
            return null;
          }
          if (next instanceof Tree) {
            if (start == pos) {
              if (start < this.safeFrom)
                return null;
              let end = start + next.length;
              if (end <= this.safeTo) {
                let lookAhead = next.prop(NodeProp.lookAhead);
                if (!lookAhead || end + lookAhead < this.fragment.to)
                  return next;
              }
            }
            this.index[last]++;
            if (start + next.length >= Math.max(this.safeFrom, pos)) {
              this.trees.push(next);
              this.start.push(start);
              this.index.push(0);
            }
          } else {
            this.index[last]++;
            this.nextStart = start + next.length;
          }
        }
      }
    };
    TokenCache = class {
      constructor(parser2, stream) {
        this.stream = stream;
        this.tokens = [];
        this.mainToken = null;
        this.actions = [];
        this.tokens = parser2.tokenizers.map((_) => new CachedToken());
      }
      getActions(stack) {
        let actionIndex = 0;
        let main = null;
        let { parser: parser2 } = stack.p, { tokenizers } = parser2;
        let mask = parser2.stateSlot(stack.state, 3);
        let context = stack.curContext ? stack.curContext.hash : 0;
        let lookAhead = 0;
        for (let i2 = 0; i2 < tokenizers.length; i2++) {
          if ((1 << i2 & mask) == 0)
            continue;
          let tokenizer = tokenizers[i2], token = this.tokens[i2];
          if (main && !tokenizer.fallback)
            continue;
          if (tokenizer.contextual || token.start != stack.pos || token.mask != mask || token.context != context) {
            this.updateCachedToken(token, tokenizer, stack);
            token.mask = mask;
            token.context = context;
          }
          if (token.lookAhead > token.end + 25)
            lookAhead = Math.max(token.lookAhead, lookAhead);
          if (token.value != 0) {
            let startIndex = actionIndex;
            if (token.extended > -1)
              actionIndex = this.addActions(stack, token.extended, token.end, actionIndex);
            actionIndex = this.addActions(stack, token.value, token.end, actionIndex);
            if (!tokenizer.extend) {
              main = token;
              if (actionIndex > startIndex)
                break;
            }
          }
        }
        while (this.actions.length > actionIndex)
          this.actions.pop();
        if (lookAhead)
          stack.setLookAhead(lookAhead);
        if (!main && stack.pos == this.stream.end) {
          main = new CachedToken();
          main.value = stack.p.parser.eofTerm;
          main.start = main.end = stack.pos;
          actionIndex = this.addActions(stack, main.value, main.end, actionIndex);
        }
        this.mainToken = main;
        return this.actions;
      }
      getMainToken(stack) {
        if (this.mainToken)
          return this.mainToken;
        let main = new CachedToken(), { pos, p } = stack;
        main.start = pos;
        main.end = Math.min(pos + 1, p.stream.end);
        main.value = pos == p.stream.end ? p.parser.eofTerm : 0;
        return main;
      }
      updateCachedToken(token, tokenizer, stack) {
        tokenizer.token(this.stream.reset(stack.pos, token), stack);
        if (token.value > -1) {
          let { parser: parser2 } = stack.p;
          for (let i2 = 0; i2 < parser2.specialized.length; i2++)
            if (parser2.specialized[i2] == token.value) {
              let result = parser2.specializers[i2](this.stream.read(token.start, token.end), stack);
              if (result >= 0 && stack.p.parser.dialect.allows(result >> 1)) {
                if ((result & 1) == 0)
                  token.value = result >> 1;
                else
                  token.extended = result >> 1;
                break;
              }
            }
        } else {
          token.value = 0;
          token.end = Math.min(stack.p.stream.end, stack.pos + 1);
        }
      }
      putAction(action, token, end, index2) {
        for (let i2 = 0; i2 < index2; i2 += 3)
          if (this.actions[i2] == action)
            return index2;
        this.actions[index2++] = action;
        this.actions[index2++] = token;
        this.actions[index2++] = end;
        return index2;
      }
      addActions(stack, token, end, index2) {
        let { state } = stack, { parser: parser2 } = stack.p, { data } = parser2;
        for (let set = 0; set < 2; set++) {
          for (let i2 = parser2.stateSlot(state, set ? 2 : 1); ; i2 += 3) {
            if (data[i2] == 65535) {
              if (data[i2 + 1] == 1) {
                i2 = pair(data, i2 + 2);
              } else {
                if (index2 == 0 && data[i2 + 1] == 2)
                  index2 = this.putAction(pair(data, i2 + 1), token, end, index2);
                break;
              }
            }
            if (data[i2] == token)
              index2 = this.putAction(pair(data, i2 + 1), token, end, index2);
          }
        }
        return index2;
      }
    };
    (function(Rec2) {
      Rec2[Rec2["Distance"] = 5] = "Distance";
      Rec2[Rec2["MaxRemainingPerStep"] = 3] = "MaxRemainingPerStep";
      Rec2[Rec2["MinBufferLengthPrune"] = 200] = "MinBufferLengthPrune";
      Rec2[Rec2["ForceReduceLimit"] = 10] = "ForceReduceLimit";
    })(Rec || (Rec = {}));
    Parse = class {
      constructor(parser2, input, fragments, ranges) {
        this.parser = parser2;
        this.input = input;
        this.ranges = ranges;
        this.recovering = 0;
        this.nextStackID = 9812;
        this.minStackPos = 0;
        this.reused = [];
        this.stoppedAt = null;
        this.stream = new InputStream(input, ranges);
        this.tokens = new TokenCache(parser2, this.stream);
        this.topTerm = parser2.top[1];
        let { from } = ranges[0];
        this.stacks = [Stack.start(this, parser2.top[0], from)];
        this.fragments = fragments.length && this.stream.end - from > parser2.bufferLength * 4 ? new FragmentCursor(fragments, parser2.nodeSet) : null;
      }
      get parsedPos() {
        return this.minStackPos;
      }
      advance() {
        let stacks = this.stacks, pos = this.minStackPos;
        let newStacks = this.stacks = [];
        let stopped, stoppedTokens;
        for (let i2 = 0; i2 < stacks.length; i2++) {
          let stack = stacks[i2];
          for (; ; ) {
            this.tokens.mainToken = null;
            if (stack.pos > pos) {
              newStacks.push(stack);
            } else if (this.advanceStack(stack, newStacks, stacks)) {
              continue;
            } else {
              if (!stopped) {
                stopped = [];
                stoppedTokens = [];
              }
              stopped.push(stack);
              let tok = this.tokens.getMainToken(stack);
              stoppedTokens.push(tok.value, tok.end);
            }
            break;
          }
        }
        if (!newStacks.length) {
          let finished = stopped && findFinished(stopped);
          if (finished)
            return this.stackToTree(finished);
          if (this.parser.strict) {
            if (verbose && stopped)
              console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none"));
            throw new SyntaxError("No parse at " + pos);
          }
          if (!this.recovering)
            this.recovering = 5;
        }
        if (this.recovering && stopped) {
          let finished = this.stoppedAt != null && stopped[0].pos > this.stoppedAt ? stopped[0] : this.runRecovery(stopped, stoppedTokens, newStacks);
          if (finished)
            return this.stackToTree(finished.forceAll());
        }
        if (this.recovering) {
          let maxRemaining = this.recovering == 1 ? 1 : this.recovering * 3;
          if (newStacks.length > maxRemaining) {
            newStacks.sort((a, b) => b.score - a.score);
            while (newStacks.length > maxRemaining)
              newStacks.pop();
          }
          if (newStacks.some((s3) => s3.reducePos > pos))
            this.recovering--;
        } else if (newStacks.length > 1) {
          outer:
            for (let i2 = 0; i2 < newStacks.length - 1; i2++) {
              let stack = newStacks[i2];
              for (let j = i2 + 1; j < newStacks.length; j++) {
                let other = newStacks[j];
                if (stack.sameState(other) || stack.buffer.length > 200 && other.buffer.length > 200) {
                  if ((stack.score - other.score || stack.buffer.length - other.buffer.length) > 0) {
                    newStacks.splice(j--, 1);
                  } else {
                    newStacks.splice(i2--, 1);
                    continue outer;
                  }
                }
              }
            }
        }
        this.minStackPos = newStacks[0].pos;
        for (let i2 = 1; i2 < newStacks.length; i2++)
          if (newStacks[i2].pos < this.minStackPos)
            this.minStackPos = newStacks[i2].pos;
        return null;
      }
      stopAt(pos) {
        if (this.stoppedAt != null && this.stoppedAt < pos)
          throw new RangeError("Can't move stoppedAt forward");
        this.stoppedAt = pos;
      }
      advanceStack(stack, stacks, split) {
        let start = stack.pos, { parser: parser2 } = this;
        let base3 = verbose ? this.stackID(stack) + " -> " : "";
        if (this.stoppedAt != null && start > this.stoppedAt)
          return stack.forceReduce() ? stack : null;
        if (this.fragments) {
          let strictCx = stack.curContext && stack.curContext.tracker.strict, cxHash = strictCx ? stack.curContext.hash : 0;
          for (let cached = this.fragments.nodeAt(start); cached; ) {
            let match = this.parser.nodeSet.types[cached.type.id] == cached.type ? parser2.getGoto(stack.state, cached.type.id) : -1;
            if (match > -1 && cached.length && (!strictCx || (cached.prop(NodeProp.contextHash) || 0) == cxHash)) {
              stack.useNode(cached, match);
              if (verbose)
                console.log(base3 + this.stackID(stack) + ` (via reuse of ${parser2.getName(cached.type.id)})`);
              return true;
            }
            if (!(cached instanceof Tree) || cached.children.length == 0 || cached.positions[0] > 0)
              break;
            let inner = cached.children[0];
            if (inner instanceof Tree && cached.positions[0] == 0)
              cached = inner;
            else
              break;
          }
        }
        let defaultReduce = parser2.stateSlot(stack.state, 4);
        if (defaultReduce > 0) {
          stack.reduce(defaultReduce);
          if (verbose)
            console.log(base3 + this.stackID(stack) + ` (via always-reduce ${parser2.getName(defaultReduce & 65535)})`);
          return true;
        }
        let actions = this.tokens.getActions(stack);
        for (let i2 = 0; i2 < actions.length; ) {
          let action = actions[i2++], term = actions[i2++], end = actions[i2++];
          let last = i2 == actions.length || !split;
          let localStack = last ? stack : stack.split();
          localStack.apply(action, term, end);
          if (verbose)
            console.log(base3 + this.stackID(localStack) + ` (via ${(action & 65536) == 0 ? "shift" : `reduce of ${parser2.getName(action & 65535)}`} for ${parser2.getName(term)} @ ${start}${localStack == stack ? "" : ", split"})`);
          if (last)
            return true;
          else if (localStack.pos > start)
            stacks.push(localStack);
          else
            split.push(localStack);
        }
        return false;
      }
      advanceFully(stack, newStacks) {
        let pos = stack.pos;
        for (; ; ) {
          if (!this.advanceStack(stack, null, null))
            return false;
          if (stack.pos > pos) {
            pushStackDedup(stack, newStacks);
            return true;
          }
        }
      }
      runRecovery(stacks, tokens, newStacks) {
        let finished = null, restarted = false;
        for (let i2 = 0; i2 < stacks.length; i2++) {
          let stack = stacks[i2], token = tokens[i2 << 1], tokenEnd = tokens[(i2 << 1) + 1];
          let base3 = verbose ? this.stackID(stack) + " -> " : "";
          if (stack.deadEnd) {
            if (restarted)
              continue;
            restarted = true;
            stack.restart();
            if (verbose)
              console.log(base3 + this.stackID(stack) + " (restarted)");
            let done = this.advanceFully(stack, newStacks);
            if (done)
              continue;
          }
          let force = stack.split(), forceBase = base3;
          for (let j = 0; force.forceReduce() && j < 10; j++) {
            if (verbose)
              console.log(forceBase + this.stackID(force) + " (via force-reduce)");
            let done = this.advanceFully(force, newStacks);
            if (done)
              break;
            if (verbose)
              forceBase = this.stackID(force) + " -> ";
          }
          for (let insert2 of stack.recoverByInsert(token)) {
            if (verbose)
              console.log(base3 + this.stackID(insert2) + " (via recover-insert)");
            this.advanceFully(insert2, newStacks);
          }
          if (this.stream.end > stack.pos) {
            if (tokenEnd == stack.pos) {
              tokenEnd++;
              token = 0;
            }
            stack.recoverByDelete(token, tokenEnd);
            if (verbose)
              console.log(base3 + this.stackID(stack) + ` (via recover-delete ${this.parser.getName(token)})`);
            pushStackDedup(stack, newStacks);
          } else if (!finished || finished.score < stack.score) {
            finished = stack;
          }
        }
        return finished;
      }
      stackToTree(stack) {
        stack.close();
        return Tree.build({
          buffer: StackBufferCursor.create(stack),
          nodeSet: this.parser.nodeSet,
          topID: this.topTerm,
          maxBufferLength: this.parser.bufferLength,
          reused: this.reused,
          start: this.ranges[0].from,
          length: stack.pos - this.ranges[0].from,
          minRepeatType: this.parser.minRepeatTerm
        });
      }
      stackID(stack) {
        let id2 = (stackIDs || (stackIDs = new WeakMap())).get(stack);
        if (!id2)
          stackIDs.set(stack, id2 = String.fromCodePoint(this.nextStackID++));
        return id2 + stack;
      }
    };
    Dialect = class {
      constructor(source, flags, disabled) {
        this.source = source;
        this.flags = flags;
        this.disabled = disabled;
      }
      allows(term) {
        return !this.disabled || this.disabled[term] == 0;
      }
    };
    id = (x2) => x2;
    ContextTracker = class {
      constructor(spec) {
        this.start = spec.start;
        this.shift = spec.shift || id;
        this.reduce = spec.reduce || id;
        this.reuse = spec.reuse || id;
        this.hash = spec.hash || (() => 0);
        this.strict = spec.strict !== false;
      }
    };
    LRParser = class extends Parser {
      constructor(spec) {
        super();
        this.wrappers = [];
        if (spec.version != 13)
          throw new RangeError(`Parser version (${spec.version}) doesn't match runtime version (${13})`);
        let nodeNames = spec.nodeNames.split(" ");
        this.minRepeatTerm = nodeNames.length;
        for (let i2 = 0; i2 < spec.repeatNodeCount; i2++)
          nodeNames.push("");
        let topTerms = Object.keys(spec.topRules).map((r2) => spec.topRules[r2][1]);
        let nodeProps = [];
        for (let i2 = 0; i2 < nodeNames.length; i2++)
          nodeProps.push([]);
        function setProp(nodeID, prop, value) {
          nodeProps[nodeID].push([prop, prop.deserialize(String(value))]);
        }
        if (spec.nodeProps)
          for (let propSpec of spec.nodeProps) {
            let prop = propSpec[0];
            for (let i2 = 1; i2 < propSpec.length; ) {
              let next = propSpec[i2++];
              if (next >= 0) {
                setProp(next, prop, propSpec[i2++]);
              } else {
                let value = propSpec[i2 + -next];
                for (let j = -next; j > 0; j--)
                  setProp(propSpec[i2++], prop, value);
                i2++;
              }
            }
          }
        this.nodeSet = new NodeSet(nodeNames.map((name2, i2) => NodeType.define({
          name: i2 >= this.minRepeatTerm ? void 0 : name2,
          id: i2,
          props: nodeProps[i2],
          top: topTerms.indexOf(i2) > -1,
          error: i2 == 0,
          skipped: spec.skippedNodes && spec.skippedNodes.indexOf(i2) > -1
        })));
        this.strict = false;
        this.bufferLength = DefaultBufferLength;
        let tokenArray = decodeArray(spec.tokenData);
        this.context = spec.context;
        this.specialized = new Uint16Array(spec.specialized ? spec.specialized.length : 0);
        this.specializers = [];
        if (spec.specialized)
          for (let i2 = 0; i2 < spec.specialized.length; i2++) {
            this.specialized[i2] = spec.specialized[i2].term;
            this.specializers[i2] = spec.specialized[i2].get;
          }
        this.states = decodeArray(spec.states, Uint32Array);
        this.data = decodeArray(spec.stateData);
        this.goto = decodeArray(spec.goto);
        this.maxTerm = spec.maxTerm;
        this.tokenizers = spec.tokenizers.map((value) => typeof value == "number" ? new TokenGroup(tokenArray, value) : value);
        this.topRules = spec.topRules;
        this.dialects = spec.dialects || {};
        this.dynamicPrecedences = spec.dynamicPrecedences || null;
        this.tokenPrecTable = spec.tokenPrec;
        this.termNames = spec.termNames || null;
        this.maxNode = this.nodeSet.types.length - 1;
        this.dialect = this.parseDialect();
        this.top = this.topRules[Object.keys(this.topRules)[0]];
      }
      createParse(input, fragments, ranges) {
        let parse = new Parse(this, input, fragments, ranges);
        for (let w of this.wrappers)
          parse = w(parse, input, fragments, ranges);
        return parse;
      }
      getGoto(state, term, loose = false) {
        let table = this.goto;
        if (term >= table[0])
          return -1;
        for (let pos = table[term + 1]; ; ) {
          let groupTag = table[pos++], last = groupTag & 1;
          let target = table[pos++];
          if (last && loose)
            return target;
          for (let end = pos + (groupTag >> 1); pos < end; pos++)
            if (table[pos] == state)
              return target;
          if (last)
            return -1;
        }
      }
      hasAction(state, terminal) {
        let data = this.data;
        for (let set = 0; set < 2; set++) {
          for (let i2 = this.stateSlot(state, set ? 2 : 1), next; ; i2 += 3) {
            if ((next = data[i2]) == 65535) {
              if (data[i2 + 1] == 1)
                next = data[i2 = pair(data, i2 + 2)];
              else if (data[i2 + 1] == 2)
                return pair(data, i2 + 2);
              else
                break;
            }
            if (next == terminal || next == 0)
              return pair(data, i2 + 1);
          }
        }
        return 0;
      }
      stateSlot(state, slot) {
        return this.states[state * 6 + slot];
      }
      stateFlag(state, flag) {
        return (this.stateSlot(state, 0) & flag) > 0;
      }
      validAction(state, action) {
        if (action == this.stateSlot(state, 4))
          return true;
        for (let i2 = this.stateSlot(state, 1); ; i2 += 3) {
          if (this.data[i2] == 65535) {
            if (this.data[i2 + 1] == 1)
              i2 = pair(this.data, i2 + 2);
            else
              return false;
          }
          if (action == pair(this.data, i2 + 1))
            return true;
        }
      }
      nextStates(state) {
        let result = [];
        for (let i2 = this.stateSlot(state, 1); ; i2 += 3) {
          if (this.data[i2] == 65535) {
            if (this.data[i2 + 1] == 1)
              i2 = pair(this.data, i2 + 2);
            else
              break;
          }
          if ((this.data[i2 + 2] & 65536 >> 16) == 0) {
            let value = this.data[i2 + 1];
            if (!result.some((v, i3) => i3 & 1 && v == value))
              result.push(this.data[i2], value);
          }
        }
        return result;
      }
      overrides(token, prev) {
        let iPrev = findOffset(this.data, this.tokenPrecTable, prev);
        return iPrev < 0 || findOffset(this.data, this.tokenPrecTable, token) < iPrev;
      }
      configure(config) {
        let copy = Object.assign(Object.create(LRParser.prototype), this);
        if (config.props)
          copy.nodeSet = this.nodeSet.extend(...config.props);
        if (config.top) {
          let info = this.topRules[config.top];
          if (!info)
            throw new RangeError(`Invalid top rule name ${config.top}`);
          copy.top = info;
        }
        if (config.tokenizers)
          copy.tokenizers = this.tokenizers.map((t3) => {
            let found = config.tokenizers.find((r2) => r2.from == t3);
            return found ? found.to : t3;
          });
        if (config.contextTracker)
          copy.context = config.contextTracker;
        if (config.dialect)
          copy.dialect = this.parseDialect(config.dialect);
        if (config.strict != null)
          copy.strict = config.strict;
        if (config.wrap)
          copy.wrappers = copy.wrappers.concat(config.wrap);
        if (config.bufferLength != null)
          copy.bufferLength = config.bufferLength;
        return copy;
      }
      getName(term) {
        return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
      }
      get eofTerm() {
        return this.maxNode + 1;
      }
      get topNode() {
        return this.nodeSet.types[this.top[1]];
      }
      dynamicPrecedence(term) {
        let prec2 = this.dynamicPrecedences;
        return prec2 == null ? 0 : prec2[term] || 0;
      }
      parseDialect(dialect) {
        let values = Object.keys(this.dialects), flags = values.map(() => false);
        if (dialect)
          for (let part of dialect.split(" ")) {
            let id2 = values.indexOf(part);
            if (id2 >= 0)
              flags[id2] = true;
          }
        let disabled = null;
        for (let i2 = 0; i2 < values.length; i2++)
          if (!flags[i2]) {
            for (let j = this.dialects[values[i2]], id2; (id2 = this.data[j++]) != 65535; )
              (disabled || (disabled = new Uint8Array(this.maxTerm + 1)))[id2] = 1;
          }
        return new Dialect(dialect, flags, disabled);
      }
      static deserialize(spec) {
        return new LRParser(spec);
      }
    };
  }
});

// node_modules/@lezer/javascript/dist/index.es.js
function tsExtends(value, stack) {
  return value == "extends" && stack.dialectEnabled(Dialect_ts) ? TSExtends : -1;
}
var noSemi, incdec, incdecPrefix, templateContent, templateDollarBrace, templateEnd, insertSemi, TSExtends, spaces, newline, LineComment, BlockComment, Dialect_ts, space, braceR, braceL, semicolon, slash, star, plus, minus, dollar, backtick, backslash, trackNewline, insertSemicolon, noSemicolon, incdecToken, template, spec_identifier, spec_word, spec_LessThan, parser;
var init_index_es2 = __esm({
  "node_modules/@lezer/javascript/dist/index.es.js"() {
    init_shims();
    init_dist9();
    init_dist5();
    noSemi = 275;
    incdec = 1;
    incdecPrefix = 2;
    templateContent = 276;
    templateDollarBrace = 277;
    templateEnd = 278;
    insertSemi = 279;
    TSExtends = 3;
    spaces = 281;
    newline = 282;
    LineComment = 4;
    BlockComment = 5;
    Dialect_ts = 1;
    space = [
      9,
      10,
      11,
      12,
      13,
      32,
      133,
      160,
      5760,
      8192,
      8193,
      8194,
      8195,
      8196,
      8197,
      8198,
      8199,
      8200,
      8201,
      8202,
      8232,
      8233,
      8239,
      8287,
      12288
    ];
    braceR = 125;
    braceL = 123;
    semicolon = 59;
    slash = 47;
    star = 42;
    plus = 43;
    minus = 45;
    dollar = 36;
    backtick = 96;
    backslash = 92;
    trackNewline = new ContextTracker({
      start: false,
      shift(context, term) {
        return term == LineComment || term == BlockComment || term == spaces ? context : term == newline;
      },
      strict: false
    });
    insertSemicolon = new ExternalTokenizer((input, stack) => {
      let { next } = input;
      if ((next == braceR || next == -1 || stack.context) && stack.canShift(insertSemi))
        input.acceptToken(insertSemi);
    }, { contextual: true, fallback: true });
    noSemicolon = new ExternalTokenizer((input, stack) => {
      let { next } = input, after;
      if (space.indexOf(next) > -1)
        return;
      if (next == slash && ((after = input.peek(1)) == slash || after == star))
        return;
      if (next != braceR && next != semicolon && next != -1 && !stack.context && stack.canShift(noSemi))
        input.acceptToken(noSemi);
    }, { contextual: true });
    incdecToken = new ExternalTokenizer((input, stack) => {
      let { next } = input;
      if (next == plus || next == minus) {
        input.advance();
        if (next == input.next) {
          input.advance();
          let mayPostfix = !stack.context && stack.canShift(incdec);
          input.acceptToken(mayPostfix ? incdec : incdecPrefix);
        }
      }
    }, { contextual: true });
    template = new ExternalTokenizer((input) => {
      for (let afterDollar = false, i2 = 0; ; i2++) {
        let { next } = input;
        if (next < 0) {
          if (i2)
            input.acceptToken(templateContent);
          break;
        } else if (next == backtick) {
          if (i2)
            input.acceptToken(templateContent);
          else
            input.acceptToken(templateEnd, 1);
          break;
        } else if (next == braceL && afterDollar) {
          if (i2 == 1)
            input.acceptToken(templateDollarBrace, 1);
          else
            input.acceptToken(templateContent, -1);
          break;
        } else if (next == 10 && i2) {
          input.advance();
          input.acceptToken(templateContent);
          break;
        } else if (next == backslash) {
          input.advance();
        }
        afterDollar = next == dollar;
        input.advance();
      }
    });
    spec_identifier = { __proto__: null, export: 16, as: 21, from: 25, default: 30, async: 35, function: 36, this: 46, true: 54, false: 54, void: 60, typeof: 64, null: 78, super: 80, new: 114, await: 131, yield: 133, delete: 134, class: 144, extends: 146, public: 189, private: 189, protected: 189, readonly: 191, instanceof: 212, in: 214, const: 216, import: 248, keyof: 299, unique: 303, infer: 309, is: 343, abstract: 363, implements: 365, type: 367, let: 370, var: 372, interface: 379, enum: 383, namespace: 389, module: 391, declare: 395, global: 399, for: 420, of: 429, while: 432, with: 436, do: 440, if: 444, else: 446, switch: 450, case: 456, try: 462, catch: 464, finally: 466, return: 470, throw: 474, break: 478, continue: 482, debugger: 486 };
    spec_word = { __proto__: null, async: 101, get: 103, set: 105, public: 153, private: 153, protected: 153, static: 155, abstract: 157, override: 159, readonly: 165, new: 347 };
    spec_LessThan = { __proto__: null, "<": 121 };
    parser = LRParser.deserialize({
      version: 13,
      states: "$1WO`QYOOO'QQ!LdO'#CgO'XOSO'#DSO)dQYO'#DXO)tQYO'#DdO){QYO'#DnO-xQYO'#DtOOQO'#EX'#EXO.]QWO'#EWO.bQWO'#EWOOQ!LS'#Eb'#EbO0aQ!LdO'#IqO2wQ!LdO'#IrO3eQWO'#EvO3jQpO'#F]OOQ!LS'#FO'#FOO3rO!bO'#FOO4QQWO'#FdO5_QWO'#FcOOQ!LS'#Ir'#IrOOQ!LQ'#Iq'#IqOOQQ'#J['#J[O5dQWO'#HjO5iQ!LYO'#HkOOQQ'#Ic'#IcOOQQ'#Hl'#HlQ`QYOOO){QYO'#DfO5qQWO'#GWO5vQ#tO'#ClO6UQWO'#EVO6aQWO'#EcO6fQ#tO'#E}O7QQWO'#GWO7VQWO'#G[O7bQWO'#G[O7pQWO'#G_O7pQWO'#G`O7pQWO'#GbO5qQWO'#GeO8aQWO'#GhO9oQWO'#CcO:PQWO'#GuO:XQWO'#G{O:XQWO'#G}O`QYO'#HPO:XQWO'#HRO:XQWO'#HUO:^QWO'#H[O:cQ!LZO'#H`O){QYO'#HbO:nQ!LZO'#HdO:yQ!LZO'#HfO5iQ!LYO'#HhO){QYO'#IsOOOS'#Hn'#HnO;UOSO,59nOOQ!LS,59n,59nO=gQbO'#CgO=qQYO'#HoO>OQWO'#ItO?}QbO'#ItO'dQYO'#ItO@UQWO,59sO@lQ&jO'#D^OAeQWO'#EXOArQWO'#JPOA}QWO'#JOOBVQWO,5:uOB[QWO'#I}OBcQWO'#DuO5vQ#tO'#EVOBqQWO'#EVOB|Q`O'#E}OOQ!LS,5:O,5:OOCUQYO,5:OOESQ!LdO,5:YOEpQWO,5:`OFZQ!LYO'#I|O7VQWO'#I{OFbQWO'#I{OFjQWO,5:tOFoQWO'#I{OF}QYO,5:rOH}QWO'#ESOJXQWO,5:rOKhQWO'#DhOKoQYO'#DmOKyQ&jO,5:{O){QYO,5:{OOQQ'#En'#EnOOQQ'#Ep'#EpO){QYO,5:}O){QYO,5:}O){QYO,5:}O){QYO,5:}O){QYO,5:}O){QYO,5:}O){QYO,5:}O){QYO,5:}O){QYO,5:}O){QYO,5:}O){QYO,5:}OOQQ'#Et'#EtOLRQYO,5;_OOQ!LS,5;d,5;dOOQ!LS,5;e,5;eONRQWO,5;eOOQ!LS,5;f,5;fO){QYO'#HyONWQ!LYO,5<PONrQWO,5:}O){QYO,5;bO! [QpO'#JTONyQpO'#JTO! cQpO'#JTO! tQpO,5;mOOOO,5;w,5;wO!!SQYO'#F_OOOO'#Hx'#HxO3rO!bO,5;jO!!ZQpO'#FaOOQ!LS,5;j,5;jO!!wQ,UO'#CqOOQ!LS'#Ct'#CtO!#[QWO'#CtO!#aOSO'#CxO!#}Q#tO,5;|O!$UQWO,5<OO!%bQWO'#FnO!%oQWO'#FoO!%tQWO'#FsO!&vQ&jO'#FwO!'iQ,UO'#IlOOQ!LS'#Il'#IlO!'sQWO'#IkO!(RQWO'#IjOOQ!LS'#Cr'#CrOOQ!LS'#Cy'#CyO!(ZQWO'#C{OJ^QWO'#FfOJ^QWO'#FhO!(`QWO'#FjO!(eQWO'#FkO!(jQWO'#FqOJ^QWO'#FvO!(oQWO'#EYO!)WQWO,5;}O`QYO,5>UOOQQ'#If'#IfOOQQ,5>V,5>VOOQQ-E;j-E;jO!+SQ!LdO,5:QOOQ!LQ'#Co'#CoO!+sQ#tO,5<rOOQO'#Ce'#CeO!,UQWO'#CpO!,^Q!LYO'#IgO5_QWO'#IgO:^QWO,59WO!,lQpO,59WO!,tQ#tO,59WO5vQ#tO,59WO!-PQWO,5:rO!-XQWO'#GtO!-dQWO'#J`O){QYO,5;gO!-lQ&jO,5;iO!-qQWO,5=_O!-vQWO,5=_O!-{QWO,5=_O5iQ!LYO,5=_O5qQWO,5<rO!.ZQWO'#EZO!.lQ&jO'#E[OOQ!LQ'#I}'#I}O!.}Q!LYO'#J]O5iQ!LYO,5<vO7pQWO,5<|OOQO'#Cq'#CqO!/YQpO,5<yO!/bQ#tO,5<zO!/mQWO,5<|O!/rQ`O,5=PO:^QWO'#GjO5qQWO'#GlO!/zQWO'#GlO5vQ#tO'#GoO!0PQWO'#GoOOQQ,5=S,5=SO!0UQWO'#GpO!0^QWO'#ClO!0cQWO,58}O!0mQWO,58}O!2oQYO,58}OOQQ,58},58}O!2|Q!LYO,58}O){QYO,58}O!3XQYO'#GwOOQQ'#Gx'#GxOOQQ'#Gy'#GyO`QYO,5=aO!3iQWO,5=aO){QYO'#DtO`QYO,5=gO`QYO,5=iO!3nQWO,5=kO`QYO,5=mO!3sQWO,5=pO!3xQYO,5=vOOQQ,5=z,5=zO){QYO,5=zO5iQ!LYO,5=|OOQQ,5>O,5>OO!7yQWO,5>OOOQQ,5>Q,5>QO!7yQWO,5>QOOQQ,5>S,5>SO!8OQ`O,5?_OOOS-E;l-E;lOOQ!LS1G/Y1G/YO!8TQbO,5>ZO){QYO,5>ZOOQO-E;m-E;mO!8_QWO,5?`O!8gQbO,5?`O!8nQWO,5?jOOQ!LS1G/_1G/_O!8vQpO'#DQOOQO'#Iv'#IvO){QYO'#IvO!9eQpO'#IvO!:SQpO'#D_O!:eQ&jO'#D_O!<pQYO'#D_O!<wQWO'#IuO!=PQWO,59xO!=UQWO'#E]O!=dQWO'#JQO!=lQWO,5:vO!>SQ&jO'#D_O){QYO,5?kO!>^QWO'#HtO!8nQWO,5?jOOQ!LQ1G0a1G0aO!?jQ&jO'#DxOOQ!LS,5:a,5:aO){QYO,5:aOH}QWO,5:aO!?qQWO,5:aO:^QWO,5:qO!,lQpO,5:qO!,tQ#tO,5:qO5vQ#tO,5:qOOQ!LS1G/j1G/jOOQ!LS1G/z1G/zOOQ!LQ'#ER'#ERO){QYO,5?hO!?|Q!LYO,5?hO!@_Q!LYO,5?hO!@fQWO,5?gO!@nQWO'#HvO!@fQWO,5?gOOQ!LQ1G0`1G0`O7VQWO,5?gOOQ!LS1G0^1G0^O!AYQ!LdO1G0^O!AyQ!LbO,5:nOOQ!LS'#Fm'#FmO!BgQ!LdO'#IlOF}QYO1G0^O!DfQ#tO'#IwO!DpQWO,5:SO!DuQbO'#IxO){QYO'#IxO!EPQWO,5:XOOQ!LS'#DQ'#DQOOQ!LS1G0g1G0gO!EUQWO1G0gO!GgQ!LdO1G0iO!GnQ!LdO1G0iO!JRQ!LdO1G0iO!JYQ!LdO1G0iO!LaQ!LdO1G0iO!LtQ!LdO1G0iO# eQ!LdO1G0iO# lQ!LdO1G0iO#$PQ!LdO1G0iO#$WQ!LdO1G0iO#%{Q!LdO1G0iO#(uQ7^O'#CgO#*pQ7^O1G0yO#,kQ7^O'#IrOOQ!LS1G1P1G1PO#-OQ!LdO,5>eOOQ!LQ-E;w-E;wO#-oQ!LdO1G0iOOQ!LS1G0i1G0iO#/qQ!LdO1G0|O#0bQpO,5;oO#0gQpO,5;pO#0lQpO'#FWO#1QQWO'#FVOOQO'#JU'#JUOOQO'#Hw'#HwO#1VQpO1G1XOOQ!LS1G1X1G1XOOOO1G1b1G1bO#1eQ7^O'#IqO#1oQWO,5;yOLRQYO,5;yOOOO-E;v-E;vOOQ!LS1G1U1G1UOOQ!LS,5;{,5;{O#1tQpO,5;{OOQ!LS,59`,59`OH}QWO'#InOOOS'#Hm'#HmO#1yOSO,59dOOQ!LS,59d,59dO){QYO1G1hO!(eQWO'#H{O#2UQWO,5<aOOQ!LS,5<^,5<^OOQO'#GR'#GROJ^QWO,5<lOOQO'#GT'#GTOJ^QWO,5<nOJ^QWO,5<pOOQO1G1j1G1jO#2aQ`O'#CoO#2tQ`O,5<YO#2{QWO'#JXO5qQWO'#JXO#3ZQWO,5<[OJ^QWO,5<ZO#3`Q`O'#FmO#3mQ`O'#JYO#3wQWO'#JYOH}QWO'#JYO#3|QWO,5<_OOQ!LQ'#Dc'#DcO#4RQWO'#FpO#4^QpO'#FxO!&qQ&jO'#FxO!&qQ&jO'#FzO#4oQWO'#F{O!(jQWO'#GOOOQO'#H}'#H}O#4tQ&jO,5<cOOQ!LS,5<c,5<cO#4{Q&jO'#FxO#5ZQ&jO'#FyO#5cQ&jO'#FyOOQ!LS,5<q,5<qOJ^QWO,5?VOJ^QWO,5?VO#5hQWO'#IOO#5sQWO,5?UOOQ!LS'#Cg'#CgO#6gQ#tO,59gOOQ!LS,59g,59gO#7YQ#tO,5<QO#7{Q#tO,5<SO#8VQWO,5<UOOQ!LS,5<V,5<VO#8[QWO,5<]O#8aQ#tO,5<bOF}QYO1G1iO#8qQWO1G1iOOQQ1G3p1G3pOOQ!LS1G/l1G/lONRQWO1G/lOOQQ1G2^1G2^OH}QWO1G2^O){QYO1G2^OH}QWO1G2^O#8vQWO1G2^O#9UQWO,59[O#:_QWO'#ESOOQ!LQ,5?R,5?RO#:iQ!LYO,5?ROOQQ1G.r1G.rO:^QWO1G.rO!,lQpO1G.rO!,tQ#tO1G.rO#:wQWO1G0^O#:|QWO'#CgO#;XQWO'#JaO#;aQWO,5=`O#;fQWO'#JaO#;kQWO'#JaO#;pQWO'#IWO#<OQWO,5?zO#<WQbO1G1ROOQ!LS1G1T1G1TO5qQWO1G2yO#<_QWO1G2yO#<dQWO1G2yO#<iQWO1G2yOOQQ1G2y1G2yO#<nQ#tO1G2^O7VQWO'#JOO7VQWO'#E]O7VQWO'#IQO#=PQ!LYO,5?wOOQQ1G2b1G2bO!/mQWO1G2hOH}QWO1G2eO#=[QWO1G2eOOQQ1G2f1G2fOH}QWO1G2fO#=aQWO1G2fO#=iQ&jO'#GdOOQQ1G2h1G2hO!&qQ&jO'#ISO!/rQ`O1G2kOOQQ1G2k1G2kOOQQ,5=U,5=UO#=qQ#tO,5=WO5qQWO,5=WO#4oQWO,5=ZO5_QWO,5=ZO!,lQpO,5=ZO!,tQ#tO,5=ZO5vQ#tO,5=ZO#>SQWO'#J_O#>_QWO,5=[OOQQ1G.i1G.iO#>dQ!LYO1G.iO#>oQWO1G.iO!(ZQWO1G.iO5iQ!LYO1G.iO#>tQbO,5?|O#?OQWO,5?|O#?ZQYO,5=cO#?bQWO,5=cO7VQWO,5?|OOQQ1G2{1G2{O`QYO1G2{OOQQ1G3R1G3ROOQQ1G3T1G3TO:XQWO1G3VO#?gQYO1G3XO#CbQYO'#HWOOQQ1G3[1G3[O:^QWO1G3bO#CoQWO1G3bO5iQ!LYO1G3fOOQQ1G3h1G3hOOQ!LQ'#Ft'#FtO5iQ!LYO1G3jO5iQ!LYO1G3lOOOS1G4y1G4yO#CwQ`O,5<PO#DPQbO1G3uO#DZQWO1G4zO#DcQWO1G5UO#DkQWO,5?bOLRQYO,5:wO7VQWO,5:wO:^QWO,59yOLRQYO,59yO!,lQpO,59yO#DpQ7^O,59yOOQO,5:w,5:wO#DzQ&jO'#HpO#EbQWO,5?aOOQ!LS1G/d1G/dO#EjQ&jO'#HuO#FOQWO,5?lOOQ!LQ1G0b1G0bO!:eQ&jO,59yO#FWQbO1G5VOOQO,5>`,5>`O7VQWO,5>`OOQO-E;r-E;rOOQ!LQ'#EO'#EOO#FbQ!LrO'#EPO!?bQ&jO'#DyOOQO'#Hs'#HsO#F|Q&jO,5:dOOQ!LS,5:d,5:dO#GTQ&jO'#DyO#GfQ&jO'#DyO#GmQ&jO'#EUO#GpQ&jO'#EPO#G}Q&jO'#EPO!?bQ&jO'#EPO#HbQWO1G/{O#HgQ`O1G/{OOQ!LS1G/{1G/{O){QYO1G/{OH}QWO1G/{OOQ!LS1G0]1G0]O:^QWO1G0]O!,lQpO1G0]O!,tQ#tO1G0]O#HnQ!LdO1G5SO){QYO1G5SO#IOQ!LYO1G5SO#IaQWO1G5RO7VQWO,5>bOOQO,5>b,5>bO#IiQWO,5>bOOQO-E;t-E;tO#IaQWO1G5RO#IwQ!LdO,59gO#KvQ!LdO,5<QO#MxQ!LdO,5<SO$ zQ!LdO,5<bOOQ!LS7+%x7+%xO$$SQ!LdO7+%xO$$sQWO'#HqO$$}QWO,5?cOOQ!LS1G/n1G/nO$%VQYO'#HrO$%dQWO,5?dO$%lQbO,5?dOOQ!LS1G/s1G/sOOQ!LS7+&R7+&RO$%vQ7^O,5:YO){QYO7+&eO$&QQ7^O,5:QOOQO1G1Z1G1ZOOQO1G1[1G1[O$&_QMhO,5;rOLRQYO,5;qOOQO-E;u-E;uOOQ!LS7+&s7+&sOOOO7+&|7+&|OOOO1G1e1G1eO$&jQWO1G1eOOQ!LS1G1g1G1gO$&oQ`O,5?YOOOS-E;k-E;kOOQ!LS1G/O1G/OO$&vQ!LdO7+'SOOQ!LS,5>g,5>gO$'gQWO,5>gOOQ!LS1G1{1G1{P$'lQWO'#H{POQ!LS-E;y-E;yO$(]Q#tO1G2WO$)OQ#tO1G2YO$)YQ#tO1G2[OOQ!LS1G1t1G1tO$)aQWO'#HzO$)oQWO,5?sO$)oQWO,5?sO$)wQWO,5?sO$*SQWO,5?sOOQO1G1v1G1vO$*bQ#tO1G1uO$*rQWO'#H|O$+SQWO,5?tOH}QWO,5?tO$+[Q`O,5?tOOQ!LS1G1y1G1yO5iQ!LYO,5<dO5iQ!LYO,5<eO$+fQWO,5<eO#4jQWO,5<eO!,lQpO,5<dO$+kQWO,5<fO5iQ!LYO,5<gO$+fQWO,5<jOOQO-E;{-E;{OOQ!LS1G1}1G1}O!&qQ&jO,5<dO$+sQWO,5<eO!&qQ&jO,5<fO!&qQ&jO,5<eO$,OQ#tO1G4qO$,YQ#tO1G4qOOQO,5>j,5>jOOQO-E;|-E;|O!-lQ&jO,59iO){QYO,59iO$,gQWO1G1pOJ^QWO1G1wO$,lQ!LdO7+'TOOQ!LS7+'T7+'TOF}QYO7+'TOOQ!LS7+%W7+%WO$-]Q`O'#JZO#HbQWO7+'xO$-gQWO7+'xO$-oQ`O7+'xOOQQ7+'x7+'xOH}QWO7+'xO){QYO7+'xOH}QWO7+'xOOQO1G.v1G.vO$-yQ!LbO'#CgO$.ZQ!LbO,5<hO$.xQWO,5<hOOQ!LQ1G4m1G4mOOQQ7+$^7+$^O:^QWO7+$^O!,lQpO7+$^OF}QYO7+%xO$.}QWO'#IVO$/]QWO,5?{OOQO1G2z1G2zO5qQWO,5?{O$/]QWO,5?{O$/eQWO,5?{OOQO,5>r,5>rOOQO-E<U-E<UOOQ!LS7+&m7+&mO$/jQWO7+(eO5iQ!LYO7+(eO5qQWO7+(eO$/oQWO7+(eO$/tQWO7+'xOOQ!LQ,5>l,5>lOOQ!LQ-E<O-E<OOOQQ7+(S7+(SO$0SQ!LbO7+(POH}QWO7+(PO$0^Q`O7+(QOOQQ7+(Q7+(QOH}QWO7+(QO$0eQWO'#J^O$0pQWO,5=OOOQO,5>n,5>nOOQO-E<Q-E<QOOQQ7+(V7+(VO$1jQ&jO'#GmOOQQ1G2r1G2rOH}QWO1G2rO){QYO1G2rOH}QWO1G2rO$1qQWO1G2rO$2PQ#tO1G2rO5iQ!LYO1G2uO#4oQWO1G2uO5_QWO1G2uO!,lQpO1G2uO!,tQ#tO1G2uO$2bQWO'#IUO$2mQWO,5?yO$2uQ&jO,5?yOOQ!LQ1G2v1G2vOOQQ7+$T7+$TO$2zQWO7+$TO5iQ!LYO7+$TO$3PQWO7+$TO){QYO1G5hO){QYO1G5iO$3UQYO1G2}O$3]QWO1G2}O$3bQYO1G2}O$3iQ!LYO1G5hOOQQ7+(g7+(gO5iQ!LYO7+(qO`QYO7+(sOOQQ'#Jd'#JdOOQQ'#IX'#IXO$3sQYO,5=rOOQQ,5=r,5=rO){QYO'#HXO$4QQWO'#HZOOQQ7+(|7+(|O$4VQYO7+(|O7VQWO7+(|OOQQ7+)Q7+)QOOQQ7+)U7+)UOOQQ7+)W7+)WOOQO1G4|1G4|O$8TQ7^O1G0cO$8_QWO1G0cOOQO1G/e1G/eO$8jQ7^O1G/eO:^QWO1G/eOLRQYO'#D_OOQO,5>[,5>[OOQO-E;n-E;nOOQO,5>a,5>aOOQO-E;s-E;sO!,lQpO1G/eOOQO1G3z1G3zO:^QWO,5:eOOQO,5:k,5:kO){QYO,5:kO$8tQ!LYO,5:kO$9PQ!LYO,5:kO!,lQpO,5:eOOQO-E;q-E;qOOQ!LS1G0O1G0OO!?bQ&jO,5:eO$9_Q&jO,5:eO$9pQ!LrO,5:kO$:[Q&jO,5:eO!?bQ&jO,5:kOOQO,5:p,5:pO$:cQ&jO,5:kO$:pQ!LYO,5:kOOQ!LS7+%g7+%gO#HbQWO7+%gO#HgQ`O7+%gOOQ!LS7+%w7+%wO:^QWO7+%wO!,lQpO7+%wO$;UQ!LdO7+*nO){QYO7+*nOOQO1G3|1G3|O7VQWO1G3|O$;fQWO7+*mO$;nQ!LdO1G2WO$=pQ!LdO1G2YO$?rQ!LdO1G1uO$AzQ#tO,5>]OOQO-E;o-E;oO$BUQbO,5>^O){QYO,5>^OOQO-E;p-E;pO$B`QWO1G5OO$BhQ7^O1G0^O$DoQ7^O1G0iO$DvQ7^O1G0iO$FwQ7^O1G0iO$GOQ7^O1G0iO$HsQ7^O1G0iO$IWQ7^O1G0iO$KeQ7^O1G0iO$KlQ7^O1G0iO$MmQ7^O1G0iO$MtQ7^O1G0iO% iQ7^O1G0iO% |Q!LdO<<JPO%!mQ7^O1G0iO%$]Q7^O'#IlO%&YQ7^O1G0|OLRQYO'#FYOOQO'#JV'#JVOOQO1G1^1G1^O%&gQWO1G1]O%&lQ7^O,5>eOOOO7+'P7+'POOOS1G4t1G4tOOQ!LS1G4R1G4ROJ^QWO7+'vO%&vQWO,5>fO5qQWO,5>fOOQO-E;x-E;xO%'UQWO1G5_O%'UQWO1G5_O%'^QWO1G5_O%'iQ`O,5>hO%'sQWO,5>hOH}QWO,5>hOOQO-E;z-E;zO%'xQ`O1G5`O%(SQWO1G5`OOQO1G2O1G2OOOQO1G2P1G2PO5iQ!LYO1G2PO$+fQWO1G2PO5iQ!LYO1G2OO%([QWO1G2QOH}QWO1G2QOOQO1G2R1G2RO5iQ!LYO1G2UO!,lQpO1G2OO#4jQWO1G2PO%(aQWO1G2QO%(iQWO1G2POJ^QWO7+*]OOQ!LS1G/T1G/TO%(tQWO1G/TOOQ!LS7+'[7+'[O%(yQ#tO7+'cO%)ZQ!LdO<<JoOOQ!LS<<Jo<<JoOH}QWO'#IPO%)zQWO,5?uOOQQ<<Kd<<KdOH}QWO<<KdO#HbQWO<<KdO%*SQWO<<KdO%*[Q`O<<KdOH}QWO1G2SOOQQ<<Gx<<GxO:^QWO<<GxO%*fQ!LdO<<IdOOQ!LS<<Id<<IdOOQO,5>q,5>qO%+VQWO,5>qO#;kQWO,5>qOOQO-E<T-E<TO%+[QWO1G5gO%+[QWO1G5gO5qQWO1G5gO%+dQWO<<LPOOQQ<<LP<<LPO%+iQWO<<LPO5iQ!LYO<<LPO){QYO<<KdOH}QWO<<KdOOQQ<<Kk<<KkO$0SQ!LbO<<KkOOQQ<<Kl<<KlO$0^Q`O<<KlO%+nQ&jO'#IRO%+yQWO,5?xOLRQYO,5?xOOQQ1G2j1G2jO#FbQ!LrO'#EPO!?bQ&jO'#GnOOQO'#IT'#ITO%,RQ&jO,5=XOOQQ,5=X,5=XO%,YQ&jO'#EPO%,eQ&jO'#EPO%,|Q&jO'#EPO%-WQ&jO'#GnO%-iQWO7+(^O%-nQWO7+(^O%-vQ`O7+(^OOQQ7+(^7+(^OH}QWO7+(^O){QYO7+(^OH}QWO7+(^O%.QQWO7+(^OOQQ7+(a7+(aO5iQ!LYO7+(aO#4oQWO7+(aO5_QWO7+(aO!,lQpO7+(aO%.`QWO,5>pOOQO-E<S-E<SOOQO'#Gq'#GqO%.kQWO1G5eO5iQ!LYO<<GoOOQQ<<Go<<GoO%.sQWO<<GoO%.xQWO7++SO%.}QWO7++TOOQQ7+(i7+(iO%/SQWO7+(iO%/XQYO7+(iO%/`QWO7+(iO){QYO7++SO){QYO7++TOOQQ<<L]<<L]OOQQ<<L_<<L_OOQQ-E<V-E<VOOQQ1G3^1G3^O%/eQWO,5=sOOQQ,5=u,5=uO:^QWO<<LhO%/jQWO<<LhOLRQYO7+%}OOQO7+%P7+%PO%/oQ7^O1G5VO:^QWO7+%POOQO1G0P1G0PO%/yQ!LdO1G0VOOQO1G0V1G0VO){QYO1G0VO%0TQ!LYO1G0VO:^QWO1G0PO!,lQpO1G0PO!?bQ&jO1G0PO%0`Q!LYO1G0VO%0nQ&jO1G0PO%1PQ!LYO1G0VO%1eQ!LrO1G0VO%1oQ&jO1G0PO!?bQ&jO1G0VOOQ!LS<<IR<<IROOQ!LS<<Ic<<IcO:^QWO<<IcO%1vQ!LdO<<NYOOQO7+)h7+)hO%2WQ!LdO7+'cO%4`QbO1G3xO%4jQ7^O7+%xO%4wQ7^O,59gO%6tQ7^O,5<QO%8qQ7^O,5<SO%:nQ7^O,5<bO%<^Q7^O7+'SO%<kQ7^O7+'TO%<xQWO,5;tOOQO7+&w7+&wO%<}Q#tO<<KbOOQO1G4Q1G4QO%=_QWO1G4QO%=jQWO1G4QO%=xQWO7+*yO%=xQWO7+*yOH}QWO1G4SO%>QQ`O1G4SO%>[QWO7+*zOOQO7+'k7+'kO5iQ!LYO7+'kOOQO7+'j7+'jO$+fQWO7+'lO%>dQ`O7+'lOOQO7+'p7+'pO5iQ!LYO7+'jO$+fQWO7+'kO%>kQWO7+'lOH}QWO7+'lO#4jQWO7+'kO%>pQ#tO<<MwOOQ!LS7+$o7+$oO%>zQ`O,5>kOOQO-E;}-E;}O#HbQWOANAOOOQQANAOANAOOH}QWOANAOO%?UQ!LbO7+'nOOQQAN=dAN=dO5qQWO1G4]OOQO1G4]1G4]O%?cQWO1G4]O%?hQWO7++RO%?hQWO7++RO5iQ!LYOANAkO%?pQWOANAkOOQQANAkANAkO%?uQWOANAOO%?}Q`OANAOOOQQANAVANAVOOQQANAWANAWO%@XQWO,5>mOOQO-E<P-E<PO%@dQ7^O1G5dO#4oQWO,5=YO5_QWO,5=YO!,lQpO,5=YOOQO-E<R-E<ROOQQ1G2s1G2sO$9pQ!LrO,5:kO!?bQ&jO,5=YO%@nQ&jO,5=YO%APQ&jO,5:kOOQQ<<Kx<<KxOH}QWO<<KxO%-iQWO<<KxO%AZQWO<<KxO%AcQ`O<<KxO){QYO<<KxOH}QWO<<KxOOQQ<<K{<<K{O5iQ!LYO<<K{O#4oQWO<<K{O5_QWO<<K{O%AmQ&jO1G4[O%ArQWO7++POOQQAN=ZAN=ZO5iQ!LYOAN=ZOOQQ<<Nn<<NnOOQQ<<No<<NoOOQQ<<LT<<LTO%AzQWO<<LTO%BPQYO<<LTO%BWQWO<<NnO%B]QWO<<NoOOQQ1G3_1G3_OOQQANBSANBSO:^QWOANBSO%BbQ7^O<<IiOOQO<<Hk<<HkOOQO7+%q7+%qO%/yQ!LdO7+%qO){QYO7+%qOOQO7+%k7+%kO:^QWO7+%kO!,lQpO7+%kO%BlQ!LYO7+%qO!?bQ&jO7+%kO%BwQ!LYO7+%qO%CVQ&jO7+%kO%ChQ!LYO7+%qOOQ!LSAN>}AN>}O%C|Q!LdO<<KbO%FUQ7^O<<JPO%FcQ7^O1G1uO%HRQ7^O1G2WO%JOQ7^O1G2YO%K{Q7^O<<JoO%LYQ7^O<<IdOOQO1G1`1G1`OOQO7+)l7+)lO%LgQWO7+)lO%LrQWO<<NeO%LzQ`O7+)nOOQO<<KV<<KVO5iQ!LYO<<KWO$+fQWO<<KWOOQO<<KU<<KUO5iQ!LYO<<KVO%MUQ`O<<KWO$+fQWO<<KVOOQQG26jG26jO#HbQWOG26jOOQO7+)w7+)wO5qQWO7+)wO%M]QWO<<NmOOQQG27VG27VO5iQ!LYOG27VOH}QWOG26jOLRQYO1G4XO%MeQWO7++OO5iQ!LYO1G2tO#4oQWO1G2tO5_QWO1G2tO!,lQpO1G2tO!?bQ&jO1G2tO%1eQ!LrO1G0VO%MmQ&jO1G2tO%-iQWOANAdOOQQANAdANAdOH}QWOANAdO%NOQWOANAdO%NWQ`OANAdOOQQANAgANAgO5iQ!LYOANAgO#4oQWOANAgOOQO'#Gr'#GrOOQO7+)v7+)vOOQQG22uG22uOOQQANAoANAoO%NbQWOANAoOOQQANDYANDYOOQQANDZANDZO%NgQYOG27nOOQO<<I]<<I]O%/yQ!LdO<<I]OOQO<<IV<<IVO:^QWO<<IVO){QYO<<I]O!,lQpO<<IVO&$eQ!LYO<<I]O!?bQ&jO<<IVO&$pQ!LYO<<I]O&%OQ7^O7+'cOOQO<<MW<<MWOOQOAN@rAN@rO5iQ!LYOAN@rOOQOAN@qAN@qO$+fQWOAN@rO5iQ!LYOAN@qOOQQLD,ULD,UOOQO<<Mc<<McOOQQLD,qLD,qO#HbQWOLD,UO&&nQ7^O7+)sOOQO7+(`7+(`O5iQ!LYO7+(`O#4oQWO7+(`O5_QWO7+(`O!,lQpO7+(`O!?bQ&jO7+(`OOQQG27OG27OO%-iQWOG27OOH}QWOG27OOOQQG27RG27RO5iQ!LYOG27ROOQQG27ZG27ZO:^QWOLD-YOOQOAN>wAN>wOOQOAN>qAN>qO%/yQ!LdOAN>wO:^QWOAN>qO){QYOAN>wO!,lQpOAN>qO&&xQ!LYOAN>wO&'TQ7^O<<KbOOQOG26^G26^O5iQ!LYOG26^OOQOG26]G26]OOQQ!$( p!$( pOOQO<<Kz<<KzO5iQ!LYO<<KzO#4oQWO<<KzO5_QWO<<KzO!,lQpO<<KzOOQQLD,jLD,jO%-iQWOLD,jOOQQLD,mLD,mOOQQ!$(!t!$(!tOOQOG24cG24cOOQOG24]G24]O%/yQ!LdOG24cO:^QWOG24]O){QYOG24cOOQOLD+xLD+xOOQOANAfANAfO5iQ!LYOANAfO#4oQWOANAfO5_QWOANAfOOQQ!$(!U!$(!UOOQOLD)}LD)}OOQOLD)wLD)wO%/yQ!LdOLD)}OOQOG27QG27QO5iQ!LYOG27QO#4oQWOG27QOOQO!$'Mi!$'MiOOQOLD,lLD,lO5iQ!LYOLD,lOOQO!$(!W!$(!WOLRQYO'#DnO&(sQbO'#IqOLRQYO'#DfO&(zQ!LdO'#CgO&)eQbO'#CgO&)uQYO,5:rOLRQYO,5:}OLRQYO,5:}OLRQYO,5:}OLRQYO,5:}OLRQYO,5:}OLRQYO,5:}OLRQYO,5:}OLRQYO,5:}OLRQYO,5:}OLRQYO,5:}OLRQYO,5:}OLRQYO'#HyO&+uQWO,5<PO&-XQWO,5:}OLRQYO,5;bO!(ZQWO'#C{O!(ZQWO'#C{OH}QWO'#FfO&+}QWO'#FfOH}QWO'#FhO&+}QWO'#FhOH}QWO'#FvO&+}QWO'#FvOLRQYO,5?kO&)uQYO1G0^O&-`Q7^O'#CgOLRQYO1G1hOH}QWO,5<lO&+}QWO,5<lOH}QWO,5<nO&+}QWO,5<nOH}QWO,5<ZO&+}QWO,5<ZO&)uQYO1G1iOLRQYO7+&eOH}QWO1G1wO&+}QWO1G1wO&)uQYO7+'TO&)uQYO7+%xOH}QWO7+'vO&+}QWO7+'vO&-jQWO'#EWO&-oQWO'#EWO&-wQWO'#EvO&-|QWO'#EcO&.RQWO'#JPO&.^QWO'#I}O&.iQWO,5:rO&.nQ#tO,5;|O&.uQWO'#FoO&.zQWO'#FoO&/PQWO,5;}O&/XQWO,5:rO&/aQ7^O1G0yO&/hQWO,5<]O&/mQWO,5<]O&/rQWO1G1iO&/wQWO1G0^O&/|Q#tO1G2[O&0TQ#tO1G2[O4QQWO'#FdO5_QWO'#FcOBqQWO'#EVOLRQYO,5;_O!(jQWO'#FqO!(jQWO'#FqOJ^QWO,5<pOJ^QWO,5<p",
      stateData: "&1Q~O'TOS'UOSSOSTOS~OPTOQTOWyO]cO^hOanObmOgcOiTOjcOkcOnTOpTOuROwcOxcOycO!PSO!ZkO!`UO!cTO!dTO!eTO!fTO!gTO!jlO#`sO#ppO#t^O${qO$}tO%PrO%QrO%TuO%VvO%YwO%ZwO%]xO%jzO%p{O%r|O%t}O%v!OO%y!PO&P!QO&T!RO&V!SO&X!TO&Z!UO&]!VO'WPO'aQO'mYO'zaO~OPZXYZX^ZXiZXrZXsZXuZX}ZX!]ZX!^ZX!`ZX!fZX!wZX#ScX#WZX#XZX#YZX#ZZX#[ZX#]ZX#^ZX#_ZX#aZX#cZX#eZX#fZX#kZX'RZX'aZX'nZX'uZX'vZX~O!X$hX~P$zO'O!XO'P!WO'Q!ZO~OPTOQTO]cOa!jOb!iOgcOiTOjcOkcOnTOpTOuROwcOxcOycO!P!bO!ZkO!`UO!cTO!dTO!eTO!fTO!gTO!j!hO#p!kO#t^O'W![O'aQO'mYO'zaO~O|!`O}!]Oz'hPz'rP~P'dO!O!lO~P`OPTOQTO]cOa!jOb!iOgcOiTOjcOkcOnTOpTOuROwcOxcOycO!P!bO!ZkO!`UO!cTO!dTO!eTO!fTO!gTO!j!hO#p!kO#t^O'W9VO'aQO'mYO'zaO~OPTOQTO]cOa!jOb!iOgcOiTOjcOkcOnTOpTOuROwcOxcOycO!P!bO!ZkO!`UO!cTO!dTO!eTO!fTO!gTO!j!hO#p!kO#t^O'aQO'mYO'zaO~O|!qO#Q!tO#R!qO'W9WO!_'oP~P+{O#S!uO~O!X!vO#S!uO~OP#]OY#cOi#QOr!zOs!zOu!{O}#aO!]#SO!^!xO!`!yO!f#]O#W#OO#X#PO#Y#PO#Z#PO#[#RO#]#SO#^#SO#_#SO#a#TO#c#VO#e#XO#f#YO'aQO'n#ZO'u!|O'v!}O~O^'eX'R'eX!_'eXz'eX!P'eX$|'eX!X'eX~P.jO!w#dO#k#dOP'fXY'fX^'fXi'fXr'fXs'fXu'fX}'fX!]'fX!^'fX!`'fX!f'fX#W'fX#X'fX#Y'fX#Z'fX#['fX#]'fX#^'fX#a'fX#c'fX#e'fX#f'fX'a'fX'n'fX'u'fX'v'fX~O#_'fX'R'fXz'fX!_'fX'c'fX!P'fX$|'fX!X'fX~P0zO!w#dO~O#v#eO#}#iO~O!P#jO#t^O$Q#kO$S#mO~O]#pOg#}Oi#qOj#pOk#pOn$OOp$POu#wO!P#xO!Z$UO!`#uO#R$VO#p$SO$Z$QO$]$RO$`$TO'W#oO'a#rO'['^P~O!`$WO~O!X$YO~O^$ZO'R$ZO~O'W$_O~O!`$WO'W$_O'X$aO']$bO~Ob$hO!`$WO'W$_O~O#_#SO~O]$qOr$mO!P$jO!`$lO$}$pO'W$_O'X$aO[(SP~O!j$rO~Ou$sO!P$tO'W$_O~Ou$sO!P$tO%V$xO'W$_O~O'W$yO~O#`sO$}tO%PrO%QrO%TuO%VvO%YwO%ZwO~Oa%SOb%RO!j%PO${%QO%_%OO~P7uOa%VObmO!P%UO!jlO#`sO${qO%PrO%QrO%TuO%VvO%YwO%ZwO%]xO~O_%YO!w%]O$}%WO'X$aO~P8tO!`%^O!c%bO~O!`%cO~O!PSO~O^$ZO&}%kO'R$ZO~O^$ZO&}%nO'R$ZO~O^$ZO&}%pO'R$ZO~O'O!XO'P!WO'Q%tO~OPZXYZXiZXrZXsZXuZX}ZX}cX!]ZX!^ZX!`ZX!fZX!wZX!wcX#ScX#WZX#XZX#YZX#ZZX#[ZX#]ZX#^ZX#_ZX#aZX#cZX#eZX#fZX#kZX'aZX'nZX'uZX'vZX~OzZXzcX~P;aO|%vOz&cX}&cX~P){O}!]Oz'hX~OP#]OY#cOi#QOr!zOs!zOu!{O}!]O!]#SO!^!xO!`!yO!f#]O#W#OO#X#PO#Y#PO#Z#PO#[#RO#]#SO#^#SO#_#SO#a#TO#c#VO#e#XO#f#YO'aQO'n#ZO'u!|O'v!}O~Oz'hX~P>WOz%{O~Ou&OO!S&YO!T&RO!U&RO'X$aO~O]&POj&PO|&SO'd%|O!O'iP!O'tP~P@ZOz'qX}'qX!X'qX!_'qX'n'qX~O!w'qX#S!{X!O'qX~PASO!w&ZOz'sX}'sX~O}&[Oz'rX~Oz&^O~O!w#dO~PASOR&bO!P&_O!k&aO'W$_O~Ob&gO!`$WO'W$_O~Or$mO!`$lO~O!O&hO~P`Or!zOs!zOu!{O!^!xO!`!yO'aQOP!baY!bai!ba}!ba!]!ba!f!ba#W!ba#X!ba#Y!ba#Z!ba#[!ba#]!ba#^!ba#_!ba#a!ba#c!ba#e!ba#f!ba'n!ba'u!ba'v!ba~O^!ba'R!baz!ba!_!ba'c!ba!P!ba$|!ba!X!ba~PC]O!_&iO~O!X!vO!w&kO'n&jO}'pX^'pX'R'pX~O!_'pX~PEuO}&oO!_'oX~O!_&qO~Ou$sO!P$tO#R&rO'W$_O~OPTOQTO]cOa!jOb!iOgcOiTOjcOkcOnTOpTOuROwcOxcOycO!PSO!ZkO!`UO!cTO!dTO!eTO!fTO!gTO!j!hO#p!kO#t^O'W9VO'aQO'mYO'zaO~O]#pOg#}Oi#qOj#pOk#pOn$OOp9iOu#wO!P#xO!Z:lO!`#uO#R9oO#p$SO$Z9kO$]9mO$`$TO'W&vO'a#rO~O#S&xO~O]#pOg#}Oi#qOj#pOk#pOn$OOp$POu#wO!P#xO!Z$UO!`#uO#R$VO#p$SO$Z$QO$]$RO$`$TO'W&vO'a#rO~O'['kP~PJ^O|&|O!_'lP~P){O'd'OO'mYO~OP9SOQ9SO]cOa:jOb!iOgcOi9SOjcOkcOn9SOp9SOuROwcOxcOycO!P!bO!Z9UO!`UO!c9SO!d9SO!e9SO!f9SO!g9SO!j!hO#p!kO#t^O'W'^O'aQO'mYO'z:hO~O!`!yO~O}#aO^$Xa'R$Xa!_$Xaz$Xa!P$Xa$|$Xa!X$Xa~O#`'eO~PH}O!X'gO!P'wX#s'wX#v'wX#}'wX~Or'hO~PNyOr'hO!P'wX#s'wX#v'wX#}'wX~O!P'jO#s'nO#v'iO#}'oO~O|'rO~PLRO#v#eO#}'uO~Or$aXu$aX!^$aX'n$aX'u$aX'v$aX~OReX}eX!weX'[eX'[$aX~P!!cOj'wO~O'O'yO'P'xO'Q'{O~Or'}Ou(OO'n#ZO'u(QO'v(SO~O'['|O~P!#lO'[(VO~O]#pOg#}Oi#qOj#pOk#pOn$OOp9iOu#wO!P#xO!Z:lO!`#uO#R9oO#p$SO$Z9kO$]9mO$`$TO'a#rO~O|(ZO'W(WO!_'{P~P!$ZO#S(]O~O|(aO'W(^Oz'|P~P!$ZO^(jOi(oOu(gO!S(mO!T(fO!U(fO!`(dO!t(nO$s(iO'X$aO'd(cO~O!O(lO~P!&RO!^!xOr'`Xu'`X'n'`X'u'`X'v'`X}'`X!w'`X~O'['`X#i'`X~P!&}OR(rO!w(qO}'_X'['_X~O}(sO'['^X~O'W(uO~O!`(zO~O'W&vO~O!`(dO~Ou$sO|!qO!P$tO#Q!tO#R!qO'W$_O!_'oP~O!X!vO#S)OO~OP#]OY#cOi#QOr!zOs!zOu!{O!]#SO!^!xO!`!yO!f#]O#W#OO#X#PO#Y#PO#Z#PO#[#RO#]#SO#^#SO#_#SO#a#TO#c#VO#e#XO#f#YO'aQO'n#ZO'u!|O'v!}O~O^!Ya}!Ya'R!Yaz!Ya!_!Ya'c!Ya!P!Ya$|!Ya!X!Ya~P!)`OR)WO!P&_O!k)VO$|)UO']$bO~O'W$yO'['^P~O!X)ZO!P'ZX^'ZX'R'ZX~O!`$WO']$bO~O!`$WO'W$_O']$bO~O!X!vO#S&xO~O$})gO'W)cO!O(TP~O})hO[(SX~O'd'OO~OY)lO~O[)mO~O!P$jO'W$_O'X$aO[(SP~Ou$sO|)rO!P$tO'W$_Oz'rP~O]&VOj&VO|)sO'd'OO!O'tP~O})tO^(PX'R(PX~O!w)xO']$bO~OR){O!P#xO']$bO~O!P)}O~Or*PO!PSO~O!j*UO~Ob*ZO~O'W(uO!O(RP~Ob$hO~O$}tO'W$yO~P8tOY*aO[*`O~OPTOQTO]cOanObmOgcOiTOjcOkcOnTOpTOuROwcOxcOycO!ZkO!`UO!cTO!dTO!eTO!fTO!gTO!jlO#t^O${qO'aQO'mYO'zaO~O!P!bO#p!kO'W9VO~P!0uO[*`O^$ZO'R$ZO~O^*eO#`*gO%P*gO%Q*gO~P){O!`%^O~O%p*lO~O!P*nO~O&Q*qO&R*pOP&OaQ&OaW&Oa]&Oa^&Oaa&Oab&Oag&Oai&Oaj&Oak&Oan&Oap&Oau&Oaw&Oax&Oay&Oa!P&Oa!Z&Oa!`&Oa!c&Oa!d&Oa!e&Oa!f&Oa!g&Oa!j&Oa#`&Oa#p&Oa#t&Oa${&Oa$}&Oa%P&Oa%Q&Oa%T&Oa%V&Oa%Y&Oa%Z&Oa%]&Oa%j&Oa%p&Oa%r&Oa%t&Oa%v&Oa%y&Oa&P&Oa&T&Oa&V&Oa&X&Oa&Z&Oa&]&Oa&|&Oa'W&Oa'a&Oa'm&Oa'z&Oa!O&Oa%w&Oa_&Oa%|&Oa~O'W*tO~O'c*wO~Oz&ca}&ca~P!)`O}!]Oz'ha~Oz'ha~P>WO}&[Oz'ra~O}tX}!VX!OtX!O!VX!XtX!X!VX!`!VX!wtX']!VX~O!X+OO!w*}O}#PX}'jX!O#PX!O'jX!X'jX!`'jX']'jX~O!X+QO!`$WO']$bO}!RX!O!RX~O]%}Oj%}Ou&OO'd(cO~OP9SOQ9SO]cOa:jOb!iOgcOi9SOjcOkcOn9SOp9SOuROwcOxcOycO!P!bO!Z9UO!`UO!c9SO!d9SO!e9SO!f9SO!g9SO!j!hO#p!kO#t^O'aQO'mYO'z:hO~O'W9sO~P!:sO}+UO!O'iX~O!O+WO~O!X+OO!w*}O}#PX!O#PX~O}+XO!O'tX~O!O+ZO~O]%}Oj%}Ou&OO'X$aO'd(cO~O!T+[O!U+[O~P!=qOu$sO|+_O!P$tO'W$_Oz&hX}&hX~O^+dO!S+gO!T+cO!U+cO!n+kO!o+iO!p+jO!q+hO!t+lO'X$aO'd(cO'm+aO~O!O+fO~P!>rOR+qO!P&_O!k+pO~O!w+wO}'pa!_'pa^'pa'R'pa~O!X!vO~P!?|O}&oO!_'oa~Ou$sO|+zO!P$tO#Q+|O#R+zO'W$_O}&jX!_&jX~O^!zi}!zi'R!ziz!zi!_!zi'c!zi!P!zi$|!zi!X!zi~P!)`O#S!va}!va!_!va!w!va!P!va^!va'R!vaz!va~P!#lO#S'`XP'`XY'`X^'`Xi'`Xs'`X!]'`X!`'`X!f'`X#W'`X#X'`X#Y'`X#Z'`X#['`X#]'`X#^'`X#_'`X#a'`X#c'`X#e'`X#f'`X'R'`X'a'`X!_'`Xz'`X!P'`X'c'`X$|'`X!X'`X~P!&}O},VO'['kX~P!#lO'[,XO~O},YO!_'lX~P!)`O!_,]O~Oz,^O~OP#]Or!zOs!zOu!{O!^!xO!`!yO!f#]O'aQOY#Vi^#Vii#Vi}#Vi!]#Vi#X#Vi#Y#Vi#Z#Vi#[#Vi#]#Vi#^#Vi#_#Vi#a#Vi#c#Vi#e#Vi#f#Vi'R#Vi'n#Vi'u#Vi'v#Viz#Vi!_#Vi'c#Vi!P#Vi$|#Vi!X#Vi~O#W#Vi~P!EZO#W#OO~P!EZOP#]Or!zOs!zOu!{O!^!xO!`!yO!f#]O#W#OO#X#PO#Y#PO#Z#PO'aQOY#Vi^#Vi}#Vi!]#Vi#[#Vi#]#Vi#^#Vi#_#Vi#a#Vi#c#Vi#e#Vi#f#Vi'R#Vi'n#Vi'u#Vi'v#Viz#Vi!_#Vi'c#Vi!P#Vi$|#Vi!X#Vi~Oi#Vi~P!GuOi#QO~P!GuOP#]Oi#QOr!zOs!zOu!{O!^!xO!`!yO!f#]O#W#OO#X#PO#Y#PO#Z#PO#[#RO'aQO^#Vi}#Vi#a#Vi#c#Vi#e#Vi#f#Vi'R#Vi'n#Vi'u#Vi'v#Viz#Vi!_#Vi'c#Vi!P#Vi$|#Vi!X#Vi~OY#Vi!]#Vi#]#Vi#^#Vi#_#Vi~P!JaOY#cO!]#SO#]#SO#^#SO#_#SO~P!JaOP#]OY#cOi#QOr!zOs!zOu!{O!]#SO!^!xO!`!yO!f#]O#W#OO#X#PO#Y#PO#Z#PO#[#RO#]#SO#^#SO#_#SO#a#TO'aQO^#Vi}#Vi#c#Vi#e#Vi#f#Vi'R#Vi'n#Vi'v#Viz#Vi!_#Vi'c#Vi!P#Vi$|#Vi!X#Vi~O'u#Vi~P!MXO'u!|O~P!MXOP#]OY#cOi#QOr!zOs!zOu!{O!]#SO!^!xO!`!yO!f#]O#W#OO#X#PO#Y#PO#Z#PO#[#RO#]#SO#^#SO#_#SO#a#TO#c#VO'aQO'u!|O^#Vi}#Vi#e#Vi#f#Vi'R#Vi'n#Viz#Vi!_#Vi'c#Vi!P#Vi$|#Vi!X#Vi~O'v#Vi~P# sO'v!}O~P# sOP#]OY#cOi#QOr!zOs!zOu!{O!]#SO!^!xO!`!yO!f#]O#W#OO#X#PO#Y#PO#Z#PO#[#RO#]#SO#^#SO#_#SO#a#TO#c#VO#e#XO'aQO'u!|O'v!}O~O^#Vi}#Vi#f#Vi'R#Vi'n#Viz#Vi!_#Vi'c#Vi!P#Vi$|#Vi!X#Vi~P#$_OPZXYZXiZXrZXsZXuZX!]ZX!^ZX!`ZX!fZX!wZX#ScX#WZX#XZX#YZX#ZZX#[ZX#]ZX#^ZX#_ZX#aZX#cZX#eZX#fZX#kZX'aZX'nZX'uZX'vZX}ZX!OZX~O#iZX~P#&rOP#]OY9gOi9[Or!zOs!zOu!{O!]9^O!^!xO!`!yO!f#]O#W9YO#X9ZO#Y9ZO#Z9ZO#[9]O#]9^O#^9^O#_9^O#a9_O#c9aO#e9cO#f9dO'aQO'n#ZO'u!|O'v!}O~O#i,`O~P#(|OP'fXY'fXi'fXr'fXs'fXu'fX!]'fX!^'fX!`'fX!f'fX#W'fX#X'fX#Y'fX#Z'fX#['fX#]'fX#^'fX#a'fX#c'fX#e'fX#f'fX'a'fX'n'fX'u'fX'v'fX}'fX~O!w9hO#k9hO#_'fX#i'fX!O'fX~P#*wO^&ma}&ma'R&ma!_&ma'c&maz&ma!P&ma$|&ma!X&ma~P!)`OP#ViY#Vi^#Vii#Vis#Vi}#Vi!]#Vi!^#Vi!`#Vi!f#Vi#W#Vi#X#Vi#Y#Vi#Z#Vi#[#Vi#]#Vi#^#Vi#_#Vi#a#Vi#c#Vi#e#Vi#f#Vi'R#Vi'a#Viz#Vi!_#Vi'c#Vi!P#Vi$|#Vi!X#Vi~P!#lO^#ji}#ji'R#jiz#ji!_#ji'c#ji!P#ji$|#ji!X#ji~P!)`O#v,bO~O#v,cO~O!X'gO!w,dO!P#zX#s#zX#v#zX#}#zX~O|,eO~O!P'jO#s,gO#v'iO#},hO~O}9eO!O'eX~P#(|O!O,iO~O#},kO~O'O'yO'P'xO'Q,nO~O],qOj,qOz,rO~O}cX!XcX!_cX!_$aX'ncX~P!!cO!_,xO~P!#lO},yO!X!vO'n&jO!_'{X~O!_-OO~Oz$aX}$aX!X$hX~P!!cO}-QOz'|X~P!#lO!X-SO~Oz-UO~O|(ZO'W$_O!_'{P~Oi-YO!X!vO!`$WO']$bO'n&jO~O!X)ZO~O!O-`O~P!&RO!T-aO!U-aO'X$aO'd(cO~Ou-cO'd(cO~O!t-dO~O'W$yO}&rX'[&rX~O}(sO'['^a~Or-iOs-iOu-jO'noa'uoa'voa}oa!woa~O'[oa#ioa~P#5{Or'}Ou(OO'n$Ya'u$Ya'v$Ya}$Ya!w$Ya~O'[$Ya#i$Ya~P#6qOr'}Ou(OO'n$[a'u$[a'v$[a}$[a!w$[a~O'[$[a#i$[a~P#7dO]-kO~O#S-lO~O'[$ja}$ja#i$ja!w$ja~P!#lO#S-oO~OR-xO!P&_O!k-wO$|-vO~O'[-yO~O]#pOi#qOj#pOk#pOn$OOp9iOu#wO!P#xO!Z:lO!`#uO#R9oO#p$SO$Z9kO$]9mO$`$TO'a#rO~Og-{O'W-zO~P#9ZO!X)ZO!P'Za^'Za'R'Za~O#S.RO~OYZX}cX!OcX~O}.SO!O(TX~O!O.UO~OY.VO~O'W)cO~O!P$jO'W$_O[&zX}&zX~O})hO[(Sa~O!_.[O~P!)`O].^O~OY._O~O[.`O~OR-xO!P&_O!k-wO$|-vO']$bO~O})tO^(Pa'R(Pa~O!w.fO~OR.iO!P#xO~O'd'OO!O(QP~OR.sO!P.oO!k.rO$|.qO']$bO~OY.}O}.{O!O(RX~O!O/OO~O[/QO^$ZO'R$ZO~O]/RO~O#_/TO%n/UO~P0zO!w#dO#_/TO%n/UO~O^/VO~P){O^/XO~O%w/]OP%uiQ%uiW%ui]%ui^%uia%uib%uig%uii%uij%uik%uin%uip%uiu%uiw%uix%uiy%ui!P%ui!Z%ui!`%ui!c%ui!d%ui!e%ui!f%ui!g%ui!j%ui#`%ui#p%ui#t%ui${%ui$}%ui%P%ui%Q%ui%T%ui%V%ui%Y%ui%Z%ui%]%ui%j%ui%p%ui%r%ui%t%ui%v%ui%y%ui&P%ui&T%ui&V%ui&X%ui&Z%ui&]%ui&|%ui'W%ui'a%ui'm%ui'z%ui!O%ui_%ui%|%ui~O_/cO!O/aO%|/bO~P`O!PSO!`/fO~O}#aO'c$Xa~Oz&ci}&ci~P!)`O}!]Oz'hi~O}&[Oz'ri~Oz/jO~O}!Ra!O!Ra~P#(|O]%}Oj%}O|/pO'd(cO}&dX!O&dX~P@ZO}+UO!O'ia~O]&VOj&VO|)sO'd'OO}&iX!O&iX~O}+XO!O'ta~Oz'si}'si~P!)`O^$ZO!X!vO!`$WO!f/{O!w/yO'R$ZO']$bO'n&jO~O!O0OO~P!>rO!T0PO!U0PO'X$aO'd(cO'm+aO~O!S0QO~P#GTO!PSO!S0QO!q0SO!t0TO~P#GTO!S0QO!o0VO!p0VO!q0SO!t0TO~P#GTO!P&_O~O!P&_O~P!#lO}'pi!_'pi^'pi'R'pi~P!)`O!w0`O}'pi!_'pi^'pi'R'pi~O}&oO!_'oi~Ou$sO!P$tO#R0bO'W$_O~O#SoaPoaYoa^oaioa!]oa!^oa!`oa!foa#Woa#Xoa#Yoa#Zoa#[oa#]oa#^oa#_oa#aoa#coa#eoa#foa'Roa'aoa!_oazoa!Poa'coa$|oa!Xoa~P#5{O#S$YaP$YaY$Ya^$Yai$Yas$Ya!]$Ya!^$Ya!`$Ya!f$Ya#W$Ya#X$Ya#Y$Ya#Z$Ya#[$Ya#]$Ya#^$Ya#_$Ya#a$Ya#c$Ya#e$Ya#f$Ya'R$Ya'a$Ya!_$Yaz$Ya!P$Ya'c$Ya$|$Ya!X$Ya~P#6qO#S$[aP$[aY$[a^$[ai$[as$[a!]$[a!^$[a!`$[a!f$[a#W$[a#X$[a#Y$[a#Z$[a#[$[a#]$[a#^$[a#_$[a#a$[a#c$[a#e$[a#f$[a'R$[a'a$[a!_$[az$[a!P$[a'c$[a$|$[a!X$[a~P#7dO#S$jaP$jaY$ja^$jai$jas$ja}$ja!]$ja!^$ja!`$ja!f$ja#W$ja#X$ja#Y$ja#Z$ja#[$ja#]$ja#^$ja#_$ja#a$ja#c$ja#e$ja#f$ja'R$ja'a$ja!_$jaz$ja!P$ja!w$ja'c$ja$|$ja!X$ja~P!#lO^!zq}!zq'R!zqz!zq!_!zq'c!zq!P!zq$|!zq!X!zq~P!)`O}&eX'[&eX~PJ^O},VO'['ka~O|0jO}&fX!_&fX~P){O},YO!_'la~O},YO!_'la~P!)`O#i!ba!O!ba~PC]O#i!Ya}!Ya!O!Ya~P#(|O!P0}O#t^O#{1OO~O!O1SO~O'c1TO~P!#lO^$Uq}$Uq'R$Uqz$Uq!_$Uq'c$Uq!P$Uq$|$Uq!X$Uq~P!)`Oz1UO~O],qOj,qO~Or'}Ou(OO'v(SO'n$ti'u$ti}$ti!w$ti~O'[$ti#i$ti~P$'tOr'}Ou(OO'n$vi'u$vi'v$vi}$vi!w$vi~O'[$vi#i$vi~P$(gO#i1VO~P!#lO|1XO'W$_O}&nX!_&nX~O},yO!_'{a~O},yO!X!vO!_'{a~O},yO!X!vO'n&jO!_'{a~O'[$ci}$ci#i$ci!w$ci~P!#lO|1`O'W(^Oz&pX}&pX~P!$ZO}-QOz'|a~O}-QOz'|a~P!#lO!X!vO~O!X!vO#_1jO~Oi1nO!X!vO'n&jO~O}'_i'['_i~P!#lO!w1qO}'_i'['_i~P!#lO!_1tO~O^$Vq}$Vq'R$Vqz$Vq!_$Vq'c$Vq!P$Vq$|$Vq!X$Vq~P!)`O}1xO!P'}X~P!#lO!P&_O$|1{O~O!P&_O$|1{O~P!#lO!P$aX$qZX^$aX'R$aX~P!!cO$q2POrfXufX!PfX'nfX'ufX'vfX^fX'RfX~O$q2PO~O$}2WO'W)cO}&yX!O&yX~O}.SO!O(Ta~OY2[O~O[2]O~O]2`O~OR2bO!P&_O!k2aO$|1{O~O^$ZO'R$ZO~P!#lO!P#xO~P!#lO}2gO!w2iO!O(QX~O!O2jO~Ou(gO!S2sO!T2lO!U2lO!n2rO!o2qO!p2qO!t2pO'X$aO'd(cO'm+aO~O!O2oO~P$0uOR2zO!P.oO!k2yO$|2xO~OR2zO!P.oO!k2yO$|2xO']$bO~O'W(uO}&xX!O&xX~O}.{O!O(Ra~O'd3TO~O]3VO~O[3XO~O!_3[O~P){O^3^O~O^3^O~P){O#_3`O%n3aO~PEuO_/cO!O3eO%|/bO~P`O!X3gO~O&R3hOP&OqQ&OqW&Oq]&Oq^&Oqa&Oqb&Oqg&Oqi&Oqj&Oqk&Oqn&Oqp&Oqu&Oqw&Oqx&Oqy&Oq!P&Oq!Z&Oq!`&Oq!c&Oq!d&Oq!e&Oq!f&Oq!g&Oq!j&Oq#`&Oq#p&Oq#t&Oq${&Oq$}&Oq%P&Oq%Q&Oq%T&Oq%V&Oq%Y&Oq%Z&Oq%]&Oq%j&Oq%p&Oq%r&Oq%t&Oq%v&Oq%y&Oq&P&Oq&T&Oq&V&Oq&X&Oq&Z&Oq&]&Oq&|&Oq'W&Oq'a&Oq'm&Oq'z&Oq!O&Oq%w&Oq_&Oq%|&Oq~O}#Pi!O#Pi~P#(|O!w3jO}#Pi!O#Pi~O}!Ri!O!Ri~P#(|O^$ZO!w3qO'R$ZO~O^$ZO!X!vO!w3qO'R$ZO~O!T3uO!U3uO'X$aO'd(cO'm+aO~O^$ZO!X!vO!`$WO!f3vO!w3qO'R$ZO']$bO'n&jO~O!S3wO~P$9_O!S3wO!q3zO!t3{O~P$9_O^$ZO!X!vO!f3vO!w3qO'R$ZO'n&jO~O}'pq!_'pq^'pq'R'pq~P!)`O}&oO!_'oq~O#S$tiP$tiY$ti^$tii$tis$ti!]$ti!^$ti!`$ti!f$ti#W$ti#X$ti#Y$ti#Z$ti#[$ti#]$ti#^$ti#_$ti#a$ti#c$ti#e$ti#f$ti'R$ti'a$ti!_$tiz$ti!P$ti'c$ti$|$ti!X$ti~P$'tO#S$viP$viY$vi^$vii$vis$vi!]$vi!^$vi!`$vi!f$vi#W$vi#X$vi#Y$vi#Z$vi#[$vi#]$vi#^$vi#_$vi#a$vi#c$vi#e$vi#f$vi'R$vi'a$vi!_$viz$vi!P$vi'c$vi$|$vi!X$vi~P$(gO#S$ciP$ciY$ci^$cii$cis$ci}$ci!]$ci!^$ci!`$ci!f$ci#W$ci#X$ci#Y$ci#Z$ci#[$ci#]$ci#^$ci#_$ci#a$ci#c$ci#e$ci#f$ci'R$ci'a$ci!_$ciz$ci!P$ci!w$ci'c$ci$|$ci!X$ci~P!#lO}&ea'[&ea~P!#lO}&fa!_&fa~P!)`O},YO!_'li~O#i!zi}!zi!O!zi~P#(|OP#]Or!zOs!zOu!{O!^!xO!`!yO!f#]O'aQOY#Vii#Vi!]#Vi#X#Vi#Y#Vi#Z#Vi#[#Vi#]#Vi#^#Vi#_#Vi#a#Vi#c#Vi#e#Vi#f#Vi#i#Vi'n#Vi'u#Vi'v#Vi}#Vi!O#Vi~O#W#Vi~P$BuO#W9YO~P$BuOP#]Or!zOs!zOu!{O!^!xO!`!yO!f#]O#W9YO#X9ZO#Y9ZO#Z9ZO'aQOY#Vi!]#Vi#[#Vi#]#Vi#^#Vi#_#Vi#a#Vi#c#Vi#e#Vi#f#Vi#i#Vi'n#Vi'u#Vi'v#Vi}#Vi!O#Vi~Oi#Vi~P$D}Oi9[O~P$D}OP#]Oi9[Or!zOs!zOu!{O!^!xO!`!yO!f#]O#W9YO#X9ZO#Y9ZO#Z9ZO#[9]O'aQO#a#Vi#c#Vi#e#Vi#f#Vi#i#Vi'n#Vi'u#Vi'v#Vi}#Vi!O#Vi~OY#Vi!]#Vi#]#Vi#^#Vi#_#Vi~P$GVOY9gO!]9^O#]9^O#^9^O#_9^O~P$GVOP#]OY9gOi9[Or!zOs!zOu!{O!]9^O!^!xO!`!yO!f#]O#W9YO#X9ZO#Y9ZO#Z9ZO#[9]O#]9^O#^9^O#_9^O#a9_O'aQO#c#Vi#e#Vi#f#Vi#i#Vi'n#Vi'v#Vi}#Vi!O#Vi~O'u#Vi~P$IkO'u!|O~P$IkOP#]OY9gOi9[Or!zOs!zOu!{O!]9^O!^!xO!`!yO!f#]O#W9YO#X9ZO#Y9ZO#Z9ZO#[9]O#]9^O#^9^O#_9^O#a9_O#c9aO'aQO'u!|O#e#Vi#f#Vi#i#Vi'n#Vi}#Vi!O#Vi~O'v#Vi~P$KsO'v!}O~P$KsOP#]OY9gOi9[Or!zOs!zOu!{O!]9^O!^!xO!`!yO!f#]O#W9YO#X9ZO#Y9ZO#Z9ZO#[9]O#]9^O#^9^O#_9^O#a9_O#c9aO#e9cO'aQO'u!|O'v!}O~O#f#Vi#i#Vi'n#Vi}#Vi!O#Vi~P$M{O^#gy}#gy'R#gyz#gy!_#gy'c#gy!P#gy$|#gy!X#gy~P!)`OP#ViY#Vii#Vis#Vi!]#Vi!^#Vi!`#Vi!f#Vi#W#Vi#X#Vi#Y#Vi#Z#Vi#[#Vi#]#Vi#^#Vi#_#Vi#a#Vi#c#Vi#e#Vi#f#Vi#i#Vi'a#Vi}#Vi!O#Vi~P!#lO!^!xOP'`XY'`Xi'`Xr'`Xs'`Xu'`X!]'`X!`'`X!f'`X#W'`X#X'`X#Y'`X#Z'`X#['`X#]'`X#^'`X#_'`X#a'`X#c'`X#e'`X#f'`X#i'`X'a'`X'n'`X'u'`X'v'`X}'`X!O'`X~O#i#ji}#ji!O#ji~P#(|O!O4]O~O}&ma!O&ma~P#(|O!X!vO'n&jO}&na!_&na~O},yO!_'{i~O},yO!X!vO!_'{i~Oz&pa}&pa~P!#lO!X4dO~O}-QOz'|i~P!#lO}-QOz'|i~Oz4jO~O!X!vO#_4pO~Oi4qO!X!vO'n&jO~Oz4sO~O'[$eq}$eq#i$eq!w$eq~P!#lO^$Vy}$Vy'R$Vyz$Vy!_$Vy'c$Vy!P$Vy$|$Vy!X$Vy~P!)`O}1xO!P'}a~O!P&_O$|4xO~O!P&_O$|4xO~P!#lO^!zy}!zy'R!zyz!zy!_!zy'c!zy!P!zy$|!zy!X!zy~P!)`OY4{O~O}.SO!O(Ti~O]5QO~O[5RO~O'd'OO}&uX!O&uX~O}2gO!O(Qa~O!O5`O~P$0uOu-cO'd(cO'm+aO~O!S5cO!T5bO!U5bO!t0TO'X$aO'd(cO'm+aO~O!o5dO!p5dO~P%,eO!T5bO!U5bO'X$aO'd(cO'm+aO~O!P.oO~O!P.oO$|5fO~O!P.oO$|5fO~P!#lOR5kO!P.oO!k5jO$|5fO~OY5pO}&xa!O&xa~O}.{O!O(Ri~O]5sO~O!_5tO~O!_5uO~O!_5vO~O!_5vO~P){O^5xO~O!X5{O~O!_5}O~O}'si!O'si~P#(|O^$ZO'R$ZO~P!)`O^$ZO!w6SO'R$ZO~O^$ZO!X!vO!w6SO'R$ZO~O!T6XO!U6XO'X$aO'd(cO'm+aO~O^$ZO!X!vO!f6YO!w6SO'R$ZO'n&jO~O!`$WO']$bO~P%1PO!S6ZO~P%0nO}'py!_'py^'py'R'py~P!)`O#S$eqP$eqY$eq^$eqi$eqs$eq}$eq!]$eq!^$eq!`$eq!f$eq#W$eq#X$eq#Y$eq#Z$eq#[$eq#]$eq#^$eq#_$eq#a$eq#c$eq#e$eq#f$eq'R$eq'a$eq!_$eqz$eq!P$eq!w$eq'c$eq$|$eq!X$eq~P!#lO}&fi!_&fi~P!)`O#i!zq}!zq!O!zq~P#(|Or-iOs-iOu-jOPoaYoaioa!]oa!^oa!`oa!foa#Woa#Xoa#Yoa#Zoa#[oa#]oa#^oa#_oa#aoa#coa#eoa#foa#ioa'aoa'noa'uoa'voa}oa!Ooa~Or'}Ou(OOP$YaY$Yai$Yas$Ya!]$Ya!^$Ya!`$Ya!f$Ya#W$Ya#X$Ya#Y$Ya#Z$Ya#[$Ya#]$Ya#^$Ya#_$Ya#a$Ya#c$Ya#e$Ya#f$Ya#i$Ya'a$Ya'n$Ya'u$Ya'v$Ya}$Ya!O$Ya~Or'}Ou(OOP$[aY$[ai$[as$[a!]$[a!^$[a!`$[a!f$[a#W$[a#X$[a#Y$[a#Z$[a#[$[a#]$[a#^$[a#_$[a#a$[a#c$[a#e$[a#f$[a#i$[a'a$[a'n$[a'u$[a'v$[a}$[a!O$[a~OP$jaY$jai$jas$ja!]$ja!^$ja!`$ja!f$ja#W$ja#X$ja#Y$ja#Z$ja#[$ja#]$ja#^$ja#_$ja#a$ja#c$ja#e$ja#f$ja#i$ja'a$ja}$ja!O$ja~P!#lO#i$Uq}$Uq!O$Uq~P#(|O#i$Vq}$Vq!O$Vq~P#(|O!O6eO~O'[$xy}$xy#i$xy!w$xy~P!#lO!X!vO}&ni!_&ni~O!X!vO'n&jO}&ni!_&ni~O},yO!_'{q~Oz&pi}&pi~P!#lO}-QOz'|q~Oz6lO~P!#lOz6lO~O}'_y'['_y~P!#lO}&sa!P&sa~P!#lO!P$pq^$pq'R$pq~P!#lOY6tO~O}.SO!O(Tq~O]6wO~O!P&_O$|6xO~O!P&_O$|6xO~P!#lO!w6yO}&ua!O&ua~O}2gO!O(Qi~P#(|O!T7PO!U7PO'X$aO'd(cO'm+aO~O!S7RO!t3{O~P%@nO!P.oO$|7UO~O!P.oO$|7UO~P!#lO'd7[O~O}.{O!O(Rq~O!_7_O~O!_7_O~P){O!_7aO~O!_7bO~O}#Py!O#Py~P#(|O^$ZO!w7hO'R$ZO~O^$ZO!X!vO!w7hO'R$ZO~O!T7kO!U7kO'X$aO'd(cO'm+aO~O^$ZO!X!vO!f7lO!w7hO'R$ZO'n&jO~O#S$xyP$xyY$xy^$xyi$xys$xy}$xy!]$xy!^$xy!`$xy!f$xy#W$xy#X$xy#Y$xy#Z$xy#[$xy#]$xy#^$xy#_$xy#a$xy#c$xy#e$xy#f$xy'R$xy'a$xy!_$xyz$xy!P$xy!w$xy'c$xy$|$xy!X$xy~P!#lO#i#gy}#gy!O#gy~P#(|OP$ciY$cii$cis$ci!]$ci!^$ci!`$ci!f$ci#W$ci#X$ci#Y$ci#Z$ci#[$ci#]$ci#^$ci#_$ci#a$ci#c$ci#e$ci#f$ci#i$ci'a$ci}$ci!O$ci~P!#lOr'}Ou(OO'v(SOP$tiY$tii$tis$ti!]$ti!^$ti!`$ti!f$ti#W$ti#X$ti#Y$ti#Z$ti#[$ti#]$ti#^$ti#_$ti#a$ti#c$ti#e$ti#f$ti#i$ti'a$ti'n$ti'u$ti}$ti!O$ti~Or'}Ou(OOP$viY$vii$vis$vi!]$vi!^$vi!`$vi!f$vi#W$vi#X$vi#Y$vi#Z$vi#[$vi#]$vi#^$vi#_$vi#a$vi#c$vi#e$vi#f$vi#i$vi'a$vi'n$vi'u$vi'v$vi}$vi!O$vi~O#i$Vy}$Vy!O$Vy~P#(|O#i!zy}!zy!O!zy~P#(|O!X!vO}&nq!_&nq~O},yO!_'{y~Oz&pq}&pq~P!#lOz7rO~P!#lO}.SO!O(Ty~O}2gO!O(Qq~O!T8OO!U8OO'X$aO'd(cO'm+aO~O!P.oO$|8RO~O!P.oO$|8RO~P!#lO!_8UO~O&R8VOP&O!ZQ&O!ZW&O!Z]&O!Z^&O!Za&O!Zb&O!Zg&O!Zi&O!Zj&O!Zk&O!Zn&O!Zp&O!Zu&O!Zw&O!Zx&O!Zy&O!Z!P&O!Z!Z&O!Z!`&O!Z!c&O!Z!d&O!Z!e&O!Z!f&O!Z!g&O!Z!j&O!Z#`&O!Z#p&O!Z#t&O!Z${&O!Z$}&O!Z%P&O!Z%Q&O!Z%T&O!Z%V&O!Z%Y&O!Z%Z&O!Z%]&O!Z%j&O!Z%p&O!Z%r&O!Z%t&O!Z%v&O!Z%y&O!Z&P&O!Z&T&O!Z&V&O!Z&X&O!Z&Z&O!Z&]&O!Z&|&O!Z'W&O!Z'a&O!Z'm&O!Z'z&O!Z!O&O!Z%w&O!Z_&O!Z%|&O!Z~O^$ZO!w8[O'R$ZO~O^$ZO!X!vO!w8[O'R$ZO~OP$eqY$eqi$eqs$eq!]$eq!^$eq!`$eq!f$eq#W$eq#X$eq#Y$eq#Z$eq#[$eq#]$eq#^$eq#_$eq#a$eq#c$eq#e$eq#f$eq#i$eq'a$eq}$eq!O$eq~P!#lO}&uq!O&uq~P#(|O^$ZO!w8qO'R$ZO~OP$xyY$xyi$xys$xy!]$xy!^$xy!`$xy!f$xy#W$xy#X$xy#Y$xy#Z$xy#[$xy#]$xy#^$xy#_$xy#a$xy#c$xy#e$xy#f$xy#i$xy'a$xy}$xy!O$xy~P!#lO'c'eX~P.jO'cZXzZX!_ZX%nZX!PZX$|ZX!XZX~P$zO!XcX!_ZX!_cX'ncX~P;aOP9SOQ9SO]cOa:jOb!iOgcOi9SOjcOkcOn9SOp9SOuROwcOxcOycO!PSO!Z9UO!`UO!c9SO!d9SO!e9SO!f9SO!g9SO!j!hO#p!kO#t^O'W'^O'aQO'mYO'z:hO~O}9eO!O$Xa~O]#pOg#}Oi#qOj#pOk#pOn$OOp9jOu#wO!P#xO!Z:mO!`#uO#R9pO#p$SO$Z9lO$]9nO$`$TO'W&vO'a#rO~O#`'eO~P&+}O!OZX!OcX~P;aO#S9XO~O!X!vO#S9XO~O!w9hO~O#_9^O~O!w9qO}'sX!O'sX~O!w9hO}'qX!O'qX~O#S9rO~O'[9tO~P!#lO#S9yO~O#S9zO~O!X!vO#S9{O~O!X!vO#S9rO~O#i9|O~P#(|O#S9}O~O#S:OO~O#S:PO~O#S:QO~O#i:RO~P!#lO#i:SO~P!#lO#t~!^!n!p!q#Q#R'z$Z$]$`$q${$|$}%T%V%Y%Z%]%_~TS#t'z#Xy'T'U#v'T'W'd~",
      goto: "#Dk(XPPPPPPP(YP(jP*^PPPP-sPP.Y3j5^5qP5qPPP5q5qP5qP7_PP7dP7xPPPP<XPPPP<X>wPPP>}AYP<XPCsPPPPEk<XPPPPPGd<XPPJcK`PPPPKdL|PMUNVPK`<X<X!#^!&V!*v!*v!.TPPP!.[!1O<XPPPPPPPPPP!3sP!5UPP<X!6cP<XP<X<X<X<XP<X!8vPP!;mP!>`!>h!>l!>lP!;jP!>p!>pP!AcP!Ag<X<X!Am!D_5qP5qP5q5qP!Eb5q5q!GY5q!I[5q!J|5q5q!Kj!Md!Md!Mh!Md!MpP!MdP5q!Nl5q# v5q5q-sPPP##TPP##m##mP##mP#$S##mPP#$YP#$PP#$P#$lMQ#$P#%Z#%a#%d(Y#%g(YP#%n#%n#%nP(YP(YP(YP(YPP(YP#%t#%wP#%w(YPPP(YP(YP(YP(YP(YP(Y(Y#%{#&V#&]#&c#&q#&w#&}#'X#'_#'i#'o#'}#(T#(Z#(i#)O#*b#*p#*v#*|#+S#+Y#+d#+j#+p#+z#,^#,dPPPPPPPPP#,jPP#-^#1[PP#2r#2y#3RP#7_PP#7c#9v#?p#?t#?w#?z#@V#@YPP#@]#@a#AO#As#Aw#BZPP#B_#Be#BiP#Bl#Bp#Bs#Cc#Cy#DO#DR#DU#D[#D_#Dc#DgmhOSj}!m$Y%a%d%e%g*i*n/]/`Q$gmQ$npQ%XyS&R!b+UQ&f!iS(f#x(kQ)a$hQ)n$pQ*Y%RQ+[&YS+c&_+eQ+u&gQ-a(mQ.z*ZY0P+g+h+i+j+kS2l.o2nU3u0Q0S0VU5b2q2r2sS6X3w3zS7P5c5dQ7k6ZR8O7R$l[ORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#a#d$Y$l%Y%]%a%c%d%e%g%k%v&O&Z&a&k&x&|'|)O)V*e*i*n+p+w,Y,`-j-o-w.R.r/T/U/V/X/]/`/b/y0`0j2a2y3^3`3a3q5j5x6S7h8[8q!j'`#[#j&S'r*}+Q,e/p0}2i3j6y9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kQ(v$PQ)f$jQ*[%UQ*c%^Q,P9iQ-|)ZQ.X)gQ/S*aQ2V.SQ3R.{Q4U9jR4}2WpeOSjy}!m$Y%W%a%d%e%g*i*n/]/`R*^%Y&WVOSTjkn}!S!W!]!j!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#[#a#d#j$Y$l%Y%]%^%a%c%d%e%g%k%v&O&Z&a&k&x&|'r'|)O)V*e*i*n*}+Q+p+w,Y,`,e-j-o-w.R.r/T/U/V/X/]/`/b/p/y0`0j0}2a2i2y3^3`3a3j3q5j5x6S6y7h8[8q9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:j:kW!cRU!`&SQ$`lQ$fmS$kp$pv$urs!q!t$W$s&[&o&r)r)s)t*g+O+_+z+|/f0bQ$}wQ&c!hQ&e!iS(Y#u(dS)`$g$hQ)d$jQ)q$rQ*T%PQ*X%RS+t&f&gQ,}(ZQ.Q)aQ.W)gQ.Y)hQ.])lQ.u*US.y*Y*ZQ0^+uQ1W,yQ2U.SQ2Y.VQ2_._Q3Q.zQ4a1XQ4|2WQ5P2[Q6s4{R7u6t!Y$dm!i$f$g$h&Q&e&f&g(e)`)a+R+b+t+u-Z.Q/u/|0R0^1m3t3y6V7i8]Q)X$`Q)y$zQ)|${Q*W%RQ.a)qQ.t*TU.x*X*Y*ZQ2{.uS3P.y.zQ5]2kQ5o3QS6}5^5aS7|7O7QQ8g7}R8v8hW#{a$b(s:hS$zt%WQ${uQ$|vR)w$x$V#za!v!x#c#u#w$Q$R$V&b'x(R(T(U(](a(q(r)U)W)Z)x){+q,V-Q-S-l-v-x.f.i.q.s1V1`1j1q1x1{2P2b2x2z4d4p4x5f5k6x7U8R9g9k9l9m9n9o9p9u9v9w9x9y9z9}:O:R:S:h:n:oV(w$P9i9jU&V!b$t+XQ'P!zQ)k$mQ.j)}Q1r-iR5X2g&YcORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#[#a#d#j$Y$l%Y%]%^%a%c%d%e%g%k%v&O&S&Z&a&k&x&|'r'|)O)V*e*i*n*}+Q+p+w,Y,`,e-j-o-w.R.r/T/U/V/X/]/`/b/p/y0`0j0}2a2i2y3^3`3a3j3q5j5x6S6y7h8[8q9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:k$]#`Z!_!n$^%u%y&t&{'R'S'T'U'V'W'X'Y'Z'[']'_'b'f'p)j*y+S+]+v,U,[,_,a,o-m/k/n0_0i0m0n0o0p0q0r0s0t0u0v0w0x0y0|1R1v2S3l3o4P4S4T4Y4Z5Z6O6R6_6c6d7e7x8Y8o8z9T:a&ZcORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#[#a#d#j$Y$l%Y%]%^%a%c%d%e%g%k%v&O&S&Z&a&k&x&|'r'|)O)V*e*i*n*}+Q+p+w,Y,`,e-j-o-w.R.r/T/U/V/X/]/`/b/p/y0`0j0}2a2i2y3^3`3a3j3q5j5x6S6y7h8[8q9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kQ&T!bR/q+UY%}!b&R&Y+U+[S(e#x(kS+b&_+eS-Z(f(mQ-[(gQ-b(nQ.l*PU/|+c+g+hU0R+i+j+kS0W+l2pQ1m-aQ1o-cQ1p-dS2k.o2nU3t0P0Q0SQ3x0TQ3y0VS5^2l2sS5a2q2rU6V3u3w3zQ6[3{S7O5b5cQ7Q5dS7i6X6ZS7}7P7RQ8]7kR8h8OlhOSj}!m$Y%a%d%e%g*i*n/]/`Q%i!QS&s!u9XQ)^$eQ*R$}Q*S%OQ+r&dS,T&x9rS-n)O9{Q.O)_Q.n*QQ/d*pQ/e*qQ/m+PQ0U+iQ0[+sS1w-o:PQ2Q.PS2T.R:QQ3k/oQ3n/wQ3}0]Q4z2RQ5|3hQ6P3mQ6T3sQ6]4OQ7c5}Q7f6UQ8X7gQ8l8VQ8n8ZR8y8p$W#_Z!_!n%u%y&t&{'R'S'T'U'V'W'X'Y'Z'[']'_'b'f'p)j*y+S+]+v,U,[,_,o-m/k/n0_0i0m0n0o0p0q0r0s0t0u0v0w0x0y0|1R1v2S3l3o4P4S4T4Y4Z5Z6O6R6_6c6d7e7x8Y8o8z9T:aU(p#y&w0{T)S$^,a$W#^Z!_!n%u%y&t&{'R'S'T'U'V'W'X'Y'Z'[']'_'b'f'p)j*y+S+]+v,U,[,_,o-m/k/n0_0i0m0n0o0p0q0r0s0t0u0v0w0x0y0|1R1v2S3l3o4P4S4T4Y4Z5Z6O6R6_6c6d7e7x8Y8o8z9T:aQ'a#_S)R$^,aR-p)S&YcORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#[#a#d#j$Y$l%Y%]%^%a%c%d%e%g%k%v&O&S&Z&a&k&x&|'r'|)O)V*e*i*n*}+Q+p+w,Y,`,e-j-o-w.R.r/T/U/V/X/]/`/b/p/y0`0j0}2a2i2y3^3`3a3j3q5j5x6S6y7h8[8q9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kQ%d{Q%e|Q%g!OQ%h!PR/[*lQ&`!hQ)T$`Q+o&cS-u)X)qS0X+m+nW1z-r-s-t.aS3|0Y0ZU4w1|1}2OU6q4v5T5UQ7t6rR8c7wT+d&_+eS+b&_+eU/|+c+g+hU0R+i+j+kS0W+l2pS2k.o2nU3t0P0Q0SQ3x0TQ3y0VS5^2l2sS5a2q2rU6V3u3w3zQ6[3{S7O5b5cQ7Q5dS7i6X6ZS7}7P7RQ8]7kR8h8OS+d&_+eT2m.o2nS&m!p/YQ,|(YQ-X(eS/{+b2kQ1],}S1g-Y-bU3v0R0W5aQ4`1WS4n1n1pU6Y3x3y7QQ6g4aQ6p4qR7l6[Q!wXS&l!p/YQ)P$XQ)[$cQ)b$iQ+x&mQ,{(YQ-W(eQ-](hQ-})]Q.v*VS/z+b2kS1[,|,}S1f-X-bQ1i-[Q1l-^Q2}.wW3r/{0R0W5aQ4_1WQ4c1]S4h1g1pQ4o1oQ5m3OW6W3v3x3y7QS6f4`4aQ6k4jQ6n4nQ6{5[Q7Y5nS7j6Y6[Q7n6gQ7p6lQ7s6pQ7z6|Q8T7ZQ8^7lQ8a7rQ8e7{Q8t8fQ8|8uQ9Q8}Q:Z:UQ:d:_R:e:`$nWORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#a#d$Y$l%Y%]%^%a%c%d%e%g%k%v&O&Z&a&k&x&|'|)O)V*e*i*n+p+w,Y,`-j-o-w.R.r/T/U/V/X/]/`/b/y0`0j2a2y3^3`3a3q5j5x6S7h8[8qS!wn!j!j:T#[#j&S'r*}+Q,e/p0}2i3j6y9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kR:Z:j$nXORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#a#d$Y$l%Y%]%^%a%c%d%e%g%k%v&O&Z&a&k&x&|'|)O)V*e*i*n+p+w,Y,`-j-o-w.R.r/T/U/V/X/]/`/b/y0`0j2a2y3^3`3a3q5j5x6S7h8[8qQ$Xb!Y$cm!i$f$g$h&Q&e&f&g(e)`)a+R+b+t+u-Z.Q/u/|0R0^1m3t3y6V7i8]S$in!jQ)]$dQ*V%RW.w*W*X*Y*ZU3O.x.y.zQ5[2kS5n3P3QU6|5]5^5aQ7Z5oU7{6}7O7QS8f7|7}S8u8g8hQ8}8v!j:U#[#j&S'r*}+Q,e/p0}2i3j6y9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kQ:_:iR:`:j$f]OSTjk}!S!W!]!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#a#d$Y$l%Y%]%a%c%d%e%g%k%v&O&Z&a&k&x&|'|)O)V*e*i*n+p+w,Y,`-j-o-w.R.r/T/U/V/X/]/`/b/y0`0j2a2y3^3`3a3q5j5x6S7h8[8qU!gRU!`v$urs!q!t$W$s&[&o&r)r)s)t*g+O+_+z+|/f0bQ*d%^!h:V#[#j'r*}+Q,e/p0}2i3j6y9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kR:Y&SS&W!b$tR/s+X$l[ORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#a#d$Y$l%Y%]%a%c%d%e%g%k%v&O&Z&a&k&x&|'|)O)V*e*i*n+p+w,Y,`-j-o-w.R.r/T/U/V/X/]/`/b/y0`0j2a2y3^3`3a3q5j5x6S7h8[8q!j'`#[#j&S'r*}+Q,e/p0}2i3j6y9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kR*c%^$noORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#a#d$Y$l%Y%]%^%a%c%d%e%g%k%v&O&Z&a&k&x&|'|)O)V*e*i*n+p+w,Y,`-j-o-w.R.r/T/U/V/X/]/`/b/y0`0j2a2y3^3`3a3q5j5x6S7h8[8qQ'P!z!k:W#[#j&S'r*}+Q,e/p0}2i3j6y9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:k!h#UZ!_$^%u%y&t&{'Y'Z'[']'b'f)j*y+]+v,U,[,o-m0_0i0y1v2S3o4P4S6R7e8Y8o8z9T!R9`'_'p+S,a/k/n0m0u0v0w0x0|1R3l4T4Y4Z5Z6O6_6c6d7x:a!d#WZ!_$^%u%y&t&{'[']'b'f)j*y+]+v,U,[,o-m0_0i0y1v2S3o4P4S6R7e8Y8o8z9T}9b'_'p+S,a/k/n0m0w0x0|1R3l4T4Y4Z5Z6O6_6c6d7x:a!`#[Z!_$^%u%y&t&{'b'f)j*y+]+v,U,[,o-m0_0i0y1v2S3o4P4S6R7e8Y8o8z9Tl(U#s&y(},w-P-e-f0g1u4^4r:[:f:gx:k'_'p+S,a/k/n0m0|1R3l4T4Y4Z5Z6O6_6c6d7x:a!`:n&u'd(X(_+n,S,l-T-q-t.e.g0Z0f1^1b2O2d2f2v4R4e4k4t4y5U5i6^6i6o7WZ:o0z4X6`7m8_&YcORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#[#a#d#j$Y$l%Y%]%^%a%c%d%e%g%k%v&O&S&Z&a&k&x&|'r'|)O)V*e*i*n*}+Q+p+w,Y,`,e-j-o-w.R.r/T/U/V/X/]/`/b/p/y0`0j0}2a2i2y3^3`3a3j3q5j5x6S6y7h8[8q9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kS#k`#lR1O,d&a_ORSTU`jk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#[#a#d#j#l$Y$l%Y%]%^%a%c%d%e%g%k%v&O&S&Z&a&k&x&|'r'|)O)V*e*i*n*}+Q+p+w,Y,`,d,e-j-o-w.R.r/T/U/V/X/]/`/b/p/y0`0j0}2a2i2y3^3`3a3j3q5j5x6S6y7h8[8q9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kS#f^#mT'i#h'mT#g^#mT'k#h'm&a`ORSTU`jk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#[#a#d#j#l$Y$l%Y%]%^%a%c%d%e%g%k%v&O&S&Z&a&k&x&|'r'|)O)V*e*i*n*}+Q+p+w,Y,`,d,e-j-o-w.R.r/T/U/V/X/]/`/b/p/y0`0j0}2a2i2y3^3`3a3j3q5j5x6S6y7h8[8q9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:kT#k`#lQ#n`R't#l$nbORSTUjk}!S!W!]!`!m!u!y!{#O#P#Q#R#S#T#U#V#W#X#Y#a#d$Y$l%Y%]%^%a%c%d%e%g%k%v&O&Z&a&k&x&|'|)O)V*e*i*n+p+w,Y,`-j-o-w.R.r/T/U/V/X/]/`/b/y0`0j2a2y3^3`3a3q5j5x6S7h8[8q!k:i#[#j&S'r*}+Q,e/p0}2i3j6y9S9U9X9Y9Z9[9]9^9_9`9a9b9c9d9e9h9q9r9t9{9|:P:Q:k#RdOSUj}!S!W!m!{#j$Y%Y%]%^%a%c%d%e%g%k&O&a'r)V*e*i*n+p,e-j-w.r/T/U/V/X/]/`/b0}2a2y3^3`3a5j5xt#ya!x$Q$R$V(R(T(U(](q(r,V-l1V1q:h:n:o!|&w!v#c#u#w&b'x(a)U)W)Z)x){+q-Q-S-v-x.f.i.q.s1`1j1x1{2P2b2x2z4d4p4x5f5k6x7U8R9k9m9o9u9w9y9}:RQ({$TQ,p'}c0{9g9l9n9p9v9x9z:O:St#va!x$Q$R$V(R(T(U(](q(r,V-l1V1q:h:n:oS(h#x(kQ(|$UQ-^(i!|:]!v#c#u#w&b'x(a)U)W)Z)x){+q-Q-S-v-x.f.i.q.s1`1j1x1{2P2b2x2z4d4p4x5f5k6x7U8R9k9m9o9u9w9y9}:Rb:^9g9l9n9p9v9x9z:O:SQ:b:lR:c:mt#ya!x$Q$R$V(R(T(U(](q(r,V-l1V1q:h:n:o!|&w!v#c#u#w&b'x(a)U)W)Z)x){+q-Q-S-v-x.f.i.q.s1`1j1x1{2P2b2x2z4d4p4x5f5k6x7U8R9k9m9o9u9w9y9}:Rc0{9g9l9n9p9v9x9z:O:SlfOSj}!m$Y%a%d%e%g*i*n/]/`Q(`#wQ*u%nQ*v%pR1_-Q$U#za!v!x#c#u#w$Q$R$V&b'x(R(T(U(](a(q(r)U)W)Z)x){+q,V-Q-S-l-v-x.f.i.q.s1V1`1j1q1x1{2P2b2x2z4d4p4x5f5k6x7U8R9g9k9l9m9n9o9p9u9v9w9x9y9z9}:O:R:S:h:n:oQ)z${Q.h)|Q2e.gR5W2fT(j#x(kS(j#x(kT2m.o2nQ)[$cQ-](hQ-})]Q.v*VQ2}.wQ5m3OQ6{5[Q7Y5nQ7z6|Q8T7ZQ8e7{Q8t8fQ8|8uR9Q8}l(R#s&y(},w-P-e-f0g1u4^4r:[:f:g!`9u&u'd(X(_+n,S,l-T-q-t.e.g0Z0f1^1b2O2d2f2v4R4e4k4t4y5U5i6^6i6o7WZ9v0z4X6`7m8_n(T#s&y(},u,w-P-e-f0g1u4^4r:[:f:g!b9w&u'd(X(_+n,S,l-T-q-t.e.g0Z0d0f1^1b2O2d2f2v4R4e4k4t4y5U5i6^6i6o7W]9x0z4X6`6a7m8_peOSjy}!m$Y%W%a%d%e%g*i*n/]/`Q%TxR*e%^peOSjy}!m$Y%W%a%d%e%g*i*n/]/`R%TxQ*O$|R.d)wqeOSjy}!m$Y%W%a%d%e%g*i*n/]/`Q.p*TS2w.t.uW5e2t2u2v2{U7T5g5h5iU8P7S7V7WQ8i8QR8w8jQ%[yR*_%WR3U.}R7]5pS$kp$pR.Y)hQ%azR*i%bR*o%hT/^*n/`QjOQ!mST$]j!mQ'z#rR,m'zQ!YQR%s!YQ!^RU%w!^%x*zQ%x!_R*z%yQ+V&TR/r+VQ,W&yR0h,WQ,Z&{S0k,Z0lR0l,[Q+e&_R/}+eQ&]!eQ*{%zT+`&]*{Q+Y&WR/t+YQ&p!rQ+y&nU+}&p+y0cR0c,OQ'm#hR,f'mQ#l`R's#lQ#bZU'c#b*x9fQ*x9TR9f'pQ,z(YW1Y,z1Z4b6hU1Z,{,|,}S4b1[1]R6h4c#q(P#s&u&y'd(X(_(x(y(}+n,Q,R,S,l,u,v,w-P-T-e-f-q-t.e.g0Z0d0e0f0g0z1^1b1u2O2d2f2v4R4V4W4X4^4e4k4r4t4y5U5i6^6`6a6b6i6o7W7m8_:[:f:gQ-R(_U1a-R1c4fQ1c-TR4f1bQ(k#xR-_(kQ(t#|R-h(tQ1y-qR4u1yQ)u$vR.c)uQ2h.jS5Y2h6zR6z5ZQ*Q$}R.m*QQ2n.oR5_2nQ.|*[S3S.|5qR5q3UQ.T)dW2X.T2Z5O6uQ2Z.WQ5O2YR6u5PQ)i$kR.Z)iQ/`*nR3d/`WiOSj!mQ%f}Q)Q$YQ*h%aQ*j%dQ*k%eQ*m%gQ/Z*iS/^*n/`R3c/]Q$[gQ%j!RQ%m!TQ%o!UQ%q!VQ)p$qQ)v$wQ*^%[Q*s%lS/P*_*bQ/g*rQ/h*uQ/i*vS/x+b2kQ1d-VQ1e-WQ1k-]Q2^.^Q2c.eQ2|.vQ3W/RQ3b/[Y3p/z/{0R0W5aQ4g1fQ4i1hQ4l1lQ5S2`Q5V2dQ5l2}Q5r3V[6Q3o3r3v3x3y7QQ6j4hQ6m4mQ6v5QQ7X5mQ7^5sW7d6R6W6Y6[Q7o6kQ7q6nQ7v6wQ7y6{Q8S7YU8W7e7j7lQ8`7pQ8b7sQ8d7zQ8k8TS8m8Y8^Q8r8aQ8s8eQ8x8oQ8{8tQ9O8zQ9P8|R9R9QQ$emQ&d!iU)_$f$g$hQ+P&QU+s&e&f&gQ-V(eS.P)`)aQ/o+RQ/w+bS0]+t+uQ1h-ZQ2R.QQ3m/uS3s/|0RQ4O0^Q4m1mS6U3t3yQ7g6VQ8Z7iR8p8]S#ta:hR)Y$bU#|a$b:hR-g(sQ#saS&u!v)ZQ&y!xQ'd#cQ(X#uQ(_#wQ(x$QQ(y$RQ(}$VQ+n&bQ,Q9kQ,R9mQ,S9oQ,l'xQ,u(RQ,v(TQ,w(UQ-P(]Q-T(aQ-e(qQ-f(rd-q)U-v.q1{2x4x5f6x7U8RQ-t)WQ.e)xQ.g){Q0Z+qQ0d9uQ0e9wQ0f9yQ0g,VQ0z9gQ1^-QQ1b-SQ1u-lQ2O-xQ2d.fQ2f.iQ2v.sQ4R9}Q4V9lQ4W9nQ4X9pQ4^1VQ4e1`Q4k1jQ4r1qQ4t1xQ4y2PQ5U2bQ5i2zQ6^:RQ6`9zQ6a9vQ6b9xQ6i4dQ6o4pQ7W5kQ7m:OQ8_:SQ:[:hQ:f:nR:g:oT'y#r'zlgOSj}!m$Y%a%d%e%g*i*n/]/`S!oU%cQ%l!SQ%r!WQ'Q!{Q'q#jS*b%Y%]Q*f%^Q*r%kQ*|&OQ+m&aQ,j'rQ-s)VQ/W*eQ0Y+pQ1Q,eQ1s-jQ1}-wQ2u.rQ3Y/TQ3Z/UQ3]/VQ3_/XQ3f/bQ4[0}Q5T2aQ5h2yQ5w3^Q5y3`Q5z3aQ7V5jR7`5x!vZOSUj}!S!m!{$Y%Y%]%^%a%c%d%e%g%k&O&a)V*e*i*n+p-j-w.r/T/U/V/X/]/`/b2a2y3^3`3a5j5xQ!_RQ!nTQ$^kQ%u!]Q%y!`Q&t!uQ&{!yQ'R#OQ'S#PQ'T#QQ'U#RQ'V#SQ'W#TQ'X#UQ'Y#VQ'Z#WQ'[#XQ']#YQ'_#[Q'b#aQ'f#dW'p#j'r,e0}Q)j$lQ*y%vS+S&S/pQ+]&ZQ+v&kQ,U&xQ,[&|Q,_9SQ,a9UQ,o'|Q-m)OQ/k*}Q/n+QQ0_+wQ0i,YQ0m9XQ0n9YQ0o9ZQ0p9[Q0q9]Q0r9^Q0s9_Q0t9`Q0u9aQ0v9bQ0w9cQ0x9dQ0y,`Q0|9hQ1R9eQ1v-oQ2S.RQ3l9qQ3o/yQ4P0`Q4S0jQ4T9rQ4Y9tQ4Z9{Q5Z2iQ6O3jQ6R3qQ6_9|Q6c:PQ6d:QQ7e6SQ7x6yQ8Y7hQ8o8[Q8z8qQ9T!WR:a:kT!XQ!YR!aRR&U!bS&Q!b+US+R&R&YR/u+[R&z!xR&}!yT!sU$WS!rU$WU$vrs*gS&n!q!tQ+{&oQ,O&rQ.b)tS0a+z+|R4Q0b[!dR!`$s&[)r+_h!pUrs!q!t$W&o&r)t+z+|0bQ/Y*gQ/l+OQ3i/fT:X&S)sT!fR$sS!eR$sS%z!`)rS+T&S)sQ+^&[R/v+_T&X!b$tQ#h^R'v#mT'l#h'mR1P,dT([#u(dR(b#wQ-r)UQ1|-vQ2t.qQ4v1{Q5g2xQ6r4xQ7S5fQ7w6xQ8Q7UR8j8RlhOSj}!m$Y%a%d%e%g*i*n/]/`Q%ZyR*^%WV$wrs*gR.k)}R*]%UQ$opR)o$pR)e$jT%_z%bT%`z%bT/_*n/`",
      nodeNames: "\u26A0 ArithOp ArithOp extends LineComment BlockComment Script ExportDeclaration export Star as VariableName from String ; default FunctionDeclaration async function VariableDefinition TypeParamList TypeDefinition ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString null super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression await yield delete LogicOp BitOp ParenthesizedExpression ClassExpression class extends ClassBody MethodDeclaration Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression PrivatePropertyName BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody MethodDeclaration AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try catch finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement",
      maxTerm: 330,
      context: trackNewline,
      nodeProps: [
        [NodeProp.group, -26, 7, 14, 16, 54, 180, 184, 187, 188, 190, 193, 196, 207, 209, 215, 217, 219, 221, 224, 230, 234, 236, 238, 240, 242, 244, 245, "Statement", -30, 11, 13, 23, 26, 27, 38, 39, 40, 41, 43, 48, 56, 64, 70, 71, 87, 88, 97, 99, 115, 118, 120, 121, 122, 123, 125, 126, 144, 145, 147, "Expression", -22, 22, 24, 28, 29, 31, 148, 150, 152, 153, 155, 156, 157, 159, 160, 161, 163, 164, 165, 174, 176, 178, 179, "Type", -3, 75, 81, 86, "ClassItem"],
        [NodeProp.closedBy, 37, "]", 47, "}", 62, ")", 128, "JSXSelfCloseEndTag JSXEndTag", 142, "JSXEndTag"],
        [NodeProp.openedBy, 42, "[", 46, "{", 61, "(", 127, "JSXStartTag", 137, "JSXStartTag JSXStartCloseTag"]
      ],
      skippedNodes: [0, 4, 5],
      repeatNodeCount: 28,
      tokenData: "!C}~R!`OX%TXY%cYZ'RZ[%c[]%T]^'R^p%Tpq%cqr'crs(kst0htu2`uv4pvw5ewx6cxy<yyz=Zz{=k{|>k|}?O}!O>k!O!P?`!P!QCl!Q!R!0[!R![!1q![!]!7s!]!^!8V!^!_!8g!_!`!9d!`!a!:[!a!b!<R!b!c%T!c!}2`!}#O!=d#O#P%T#P#Q!=t#Q#R!>U#R#S2`#S#T!>i#T#o2`#o#p!>y#p#q!?O#q#r!?f#r#s!?x#s$f%T$f$g%c$g#BY2`#BY#BZ!@Y#BZ$IS2`$IS$I_!@Y$I_$I|2`$I|$I}!Bq$I}$JO!Bq$JO$JT2`$JT$JU!@Y$JU$KV2`$KV$KW!@Y$KW&FU2`&FU&FV!@Y&FV?HT2`?HT?HU!@Y?HU~2`W%YR$QWO!^%T!_#o%T#p~%T,T%jg$QW'T+{OX%TXY%cYZ%TZ[%c[p%Tpq%cq!^%T!_#o%T#p$f%T$f$g%c$g#BY%T#BY#BZ%c#BZ$IS%T$IS$I_%c$I_$JT%T$JT$JU%c$JU$KV%T$KV$KW%c$KW&FU%T&FU&FV%c&FV?HT%T?HT?HU%c?HU~%T,T'YR$QW'U+{O!^%T!_#o%T#p~%T$T'jS$QW!f#{O!^%T!_!`'v!`#o%T#p~%T$O'}S#a#v$QWO!^%T!_!`(Z!`#o%T#p~%T$O(bR#a#v$QWO!^%T!_#o%T#p~%T'u(rZ$QW]!ROY(kYZ)eZr(krs*rs!^(k!^!_+U!_#O(k#O#P-b#P#o(k#o#p+U#p~(k&r)jV$QWOr)ers*Ps!^)e!^!_*a!_#o)e#o#p*a#p~)e&r*WR#{&j$QWO!^%T!_#o%T#p~%T&j*dROr*ars*ms~*a&j*rO#{&j'u*{R#{&j$QW]!RO!^%T!_#o%T#p~%T'm+ZV]!ROY+UYZ*aZr+Urs+ps#O+U#O#P+w#P~+U'm+wO#{&j]!R'm+zROr+Urs,Ts~+U'm,[U#{&j]!ROY,nZr,nrs-Vs#O,n#O#P-[#P~,n!R,sU]!ROY,nZr,nrs-Vs#O,n#O#P-[#P~,n!R-[O]!R!R-_PO~,n'u-gV$QWOr(krs-|s!^(k!^!_+U!_#o(k#o#p+U#p~(k'u.VZ#{&j$QW]!ROY.xYZ%TZr.xrs/rs!^.x!^!_,n!_#O.x#O#P0S#P#o.x#o#p,n#p~.x!Z/PZ$QW]!ROY.xYZ%TZr.xrs/rs!^.x!^!_,n!_#O.x#O#P0S#P#o.x#o#p,n#p~.x!Z/yR$QW]!RO!^%T!_#o%T#p~%T!Z0XT$QWO!^.x!^!_,n!_#o.x#o#p,n#p~.xy0mZ$QWOt%Ttu1`u!^%T!_!c%T!c!}1`!}#R%T#R#S1`#S#T%T#T#o1`#p$g%T$g~1`y1g]$QW'mqOt%Ttu1`u!Q%T!Q![1`![!^%T!_!c%T!c!}1`!}#R%T#R#S1`#S#T%T#T#o1`#p$g%T$g~1`&i2k_$QW#vS'W%k'dpOt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$g%T$g~2`[3q_$QW#vSOt%Ttu3ju}%T}!O3j!O!Q%T!Q![3j![!^%T!_!c%T!c!}3j!}#R%T#R#S3j#S#T%T#T#o3j#p$g%T$g~3j$O4wS#Y#v$QWO!^%T!_!`5T!`#o%T#p~%T$O5[R$QW#k#vO!^%T!_#o%T#p~%T%r5lU'v%j$QWOv%Tvw6Ow!^%T!_!`5T!`#o%T#p~%T$O6VS$QW#e#vO!^%T!_!`5T!`#o%T#p~%T'u6jZ$QW]!ROY6cYZ7]Zw6cwx*rx!^6c!^!_8T!_#O6c#O#P:T#P#o6c#o#p8T#p~6c&r7bV$QWOw7]wx*Px!^7]!^!_7w!_#o7]#o#p7w#p~7]&j7zROw7wwx*mx~7w'm8YV]!ROY8TYZ7wZw8Twx+px#O8T#O#P8o#P~8T'm8rROw8Twx8{x~8T'm9SU#{&j]!ROY9fZw9fwx-Vx#O9f#O#P9}#P~9f!R9kU]!ROY9fZw9fwx-Vx#O9f#O#P9}#P~9f!R:QPO~9f'u:YV$QWOw6cwx:ox!^6c!^!_8T!_#o6c#o#p8T#p~6c'u:xZ#{&j$QW]!ROY;kYZ%TZw;kwx/rx!^;k!^!_9f!_#O;k#O#P<e#P#o;k#o#p9f#p~;k!Z;rZ$QW]!ROY;kYZ%TZw;kwx/rx!^;k!^!_9f!_#O;k#O#P<e#P#o;k#o#p9f#p~;k!Z<jT$QWO!^;k!^!_9f!_#o;k#o#p9f#p~;k%V=QR!`$}$QWO!^%T!_#o%T#p~%TZ=bR!_R$QWO!^%T!_#o%T#p~%T%R=tU'X!R#Z#v$QWOz%Tz{>W{!^%T!_!`5T!`#o%T#p~%T$O>_S#W#v$QWO!^%T!_!`5T!`#o%T#p~%T$u>rSi$m$QWO!^%T!_!`5T!`#o%T#p~%T&i?VR}&a$QWO!^%T!_#o%T#p~%T&i?gVr%n$QWO!O%T!O!P?|!P!Q%T!Q![@r![!^%T!_#o%T#p~%Ty@RT$QWO!O%T!O!P@b!P!^%T!_#o%T#p~%Ty@iR|q$QWO!^%T!_#o%T#p~%Ty@yZ$QWjqO!Q%T!Q![@r![!^%T!_!g%T!g!hAl!h#R%T#R#S@r#S#X%T#X#YAl#Y#o%T#p~%TyAqZ$QWO{%T{|Bd|}%T}!OBd!O!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%TyBiV$QWO!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%TyCVV$QWjqO!Q%T!Q![CO![!^%T!_#R%T#R#SCO#S#o%T#p~%T,TCs`$QW#X#vOYDuYZ%TZzDuz{Jl{!PDu!P!Q!-e!Q!^Du!^!_Fx!_!`!.^!`!a!/]!a!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~DuXD|[$QWyPOYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~DuXEy_$QWyPO!^%T!_#Z%T#Z#[Er#[#]%T#]#^Er#^#a%T#a#bEr#b#g%T#g#hEr#h#i%T#i#jEr#j#m%T#m#nEr#n#o%T#p~%TPF}VyPOYFxZ!PFx!P!QGd!Q!}Fx!}#OG{#O#PHh#P~FxPGiUyP#Z#[Gd#]#^Gd#a#bGd#g#hGd#i#jGd#m#nGdPHOTOYG{Z#OG{#O#PH_#P#QFx#Q~G{PHbQOYG{Z~G{PHkQOYFxZ~FxXHvY$QWOYHqYZ%TZ!^Hq!^!_G{!_#OHq#O#PIf#P#QDu#Q#oHq#o#pG{#p~HqXIkV$QWOYHqYZ%TZ!^Hq!^!_G{!_#oHq#o#pG{#p~HqXJVV$QWOYDuYZ%TZ!^Du!^!_Fx!_#oDu#o#pFx#p~Du,TJs^$QWyPOYJlYZKoZzJlz{NQ{!PJl!P!Q!,R!Q!^Jl!^!_!!]!_!}Jl!}#O!'|#O#P!+a#P#oJl#o#p!!]#p~Jl,TKtV$QWOzKoz{LZ{!^Ko!^!_M]!_#oKo#o#pM]#p~Ko,TL`X$QWOzKoz{LZ{!PKo!P!QL{!Q!^Ko!^!_M]!_#oKo#o#pM]#p~Ko,TMSR$QWT+{O!^%T!_#o%T#p~%T+{M`ROzM]z{Mi{~M]+{MlTOzM]z{Mi{!PM]!P!QM{!Q~M]+{NQOT+{,TNX^$QWyPOYJlYZKoZzJlz{NQ{!PJl!P!Q! T!Q!^Jl!^!_!!]!_!}Jl!}#O!'|#O#P!+a#P#oJl#o#p!!]#p~Jl,T! ^_$QWT+{yPO!^%T!_#Z%T#Z#[Er#[#]%T#]#^Er#^#a%T#a#bEr#b#g%T#g#hEr#h#i%T#i#jEr#j#m%T#m#nEr#n#o%T#p~%T+{!!bYyPOY!!]YZM]Zz!!]z{!#Q{!P!!]!P!Q!&x!Q!}!!]!}#O!$`#O#P!&f#P~!!]+{!#VYyPOY!!]YZM]Zz!!]z{!#Q{!P!!]!P!Q!#u!Q!}!!]!}#O!$`#O#P!&f#P~!!]+{!#|UT+{yP#Z#[Gd#]#^Gd#a#bGd#g#hGd#i#jGd#m#nGd+{!$cWOY!$`YZM]Zz!$`z{!${{#O!$`#O#P!&S#P#Q!!]#Q~!$`+{!%OYOY!$`YZM]Zz!$`z{!${{!P!$`!P!Q!%n!Q#O!$`#O#P!&S#P#Q!!]#Q~!$`+{!%sTT+{OYG{Z#OG{#O#PH_#P#QFx#Q~G{+{!&VTOY!$`YZM]Zz!$`z{!${{~!$`+{!&iTOY!!]YZM]Zz!!]z{!#Q{~!!]+{!&}_yPOzM]z{Mi{#ZM]#Z#[!&x#[#]M]#]#^!&x#^#aM]#a#b!&x#b#gM]#g#h!&x#h#iM]#i#j!&x#j#mM]#m#n!&x#n~M],T!(R[$QWOY!'|YZKoZz!'|z{!(w{!^!'|!^!_!$`!_#O!'|#O#P!*o#P#QJl#Q#o!'|#o#p!$`#p~!'|,T!(|^$QWOY!'|YZKoZz!'|z{!(w{!P!'|!P!Q!)x!Q!^!'|!^!_!$`!_#O!'|#O#P!*o#P#QJl#Q#o!'|#o#p!$`#p~!'|,T!*PY$QWT+{OYHqYZ%TZ!^Hq!^!_G{!_#OHq#O#PIf#P#QDu#Q#oHq#o#pG{#p~Hq,T!*tX$QWOY!'|YZKoZz!'|z{!(w{!^!'|!^!_!$`!_#o!'|#o#p!$`#p~!'|,T!+fX$QWOYJlYZKoZzJlz{NQ{!^Jl!^!_!!]!_#oJl#o#p!!]#p~Jl,T!,Yc$QWyPOzKoz{LZ{!^Ko!^!_M]!_#ZKo#Z#[!,R#[#]Ko#]#^!,R#^#aKo#a#b!,R#b#gKo#g#h!,R#h#iKo#i#j!,R#j#mKo#m#n!,R#n#oKo#o#pM]#p~Ko,T!-lV$QWS+{OY!-eYZ%TZ!^!-e!^!_!.R!_#o!-e#o#p!.R#p~!-e+{!.WQS+{OY!.RZ~!.R$P!.g[$QW#k#vyPOYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~Du]!/f[#sS$QWyPOYDuYZ%TZ!PDu!P!QEr!Q!^Du!^!_Fx!_!}Du!}#OHq#O#PJQ#P#oDu#o#pFx#p~Duy!0cd$QWjqO!O%T!O!P@r!P!Q%T!Q![!1q![!^%T!_!g%T!g!hAl!h#R%T#R#S!1q#S#U%T#U#V!3X#V#X%T#X#YAl#Y#b%T#b#c!2w#c#d!4m#d#l%T#l#m!5{#m#o%T#p~%Ty!1x_$QWjqO!O%T!O!P@r!P!Q%T!Q![!1q![!^%T!_!g%T!g!hAl!h#R%T#R#S!1q#S#X%T#X#YAl#Y#b%T#b#c!2w#c#o%T#p~%Ty!3OR$QWjqO!^%T!_#o%T#p~%Ty!3^W$QWO!Q%T!Q!R!3v!R!S!3v!S!^%T!_#R%T#R#S!3v#S#o%T#p~%Ty!3}Y$QWjqO!Q%T!Q!R!3v!R!S!3v!S!^%T!_#R%T#R#S!3v#S#b%T#b#c!2w#c#o%T#p~%Ty!4rV$QWO!Q%T!Q!Y!5X!Y!^%T!_#R%T#R#S!5X#S#o%T#p~%Ty!5`X$QWjqO!Q%T!Q!Y!5X!Y!^%T!_#R%T#R#S!5X#S#b%T#b#c!2w#c#o%T#p~%Ty!6QZ$QWO!Q%T!Q![!6s![!^%T!_!c%T!c!i!6s!i#R%T#R#S!6s#S#T%T#T#Z!6s#Z#o%T#p~%Ty!6z]$QWjqO!Q%T!Q![!6s![!^%T!_!c%T!c!i!6s!i#R%T#R#S!6s#S#T%T#T#Z!6s#Z#b%T#b#c!2w#c#o%T#p~%T%w!7|R!XV$QW#i%hO!^%T!_#o%T#p~%T!P!8^R^w$QWO!^%T!_#o%T#p~%T+c!8rR']d!]%Y#t&s'zP!P!Q!8{!^!_!9Q!_!`!9_W!9QO$SW#v!9VP#[#v!_!`!9Y#v!9_O#k#v#v!9dO#]#v%w!9kT!w%o$QWO!^%T!_!`'v!`!a!9z!a#o%T#p~%T$P!:RR#S#w$QWO!^%T!_#o%T#p~%T%w!:gT'[!s#]#v#}S$QWO!^%T!_!`!:v!`!a!;W!a#o%T#p~%T$O!:}R#]#v$QWO!^%T!_#o%T#p~%T$O!;_T#[#v$QWO!^%T!_!`5T!`!a!;n!a#o%T#p~%T$O!;uS#[#v$QWO!^%T!_!`5T!`#o%T#p~%T%w!<YV'n%o$QWO!O%T!O!P!<o!P!^%T!_!a%T!a!b!=P!b#o%T#p~%T$`!<vRs$W$QWO!^%T!_#o%T#p~%T$O!=WS$QW#f#vO!^%T!_!`5T!`#o%T#p~%T&e!=kRu&]$QWO!^%T!_#o%T#p~%TZ!={RzR$QWO!^%T!_#o%T#p~%T$O!>]S#c#v$QWO!^%T!_!`5T!`#o%T#p~%T$P!>pR$QW'a#wO!^%T!_#o%T#p~%T~!?OO!P~%r!?VT'u%j$QWO!^%T!_!`5T!`#o%T#p#q!=P#q~%T$u!?oR!O$k$QW'cQO!^%T!_#o%T#p~%TX!@PR!gP$QWO!^%T!_#o%T#p~%T,T!@gr$QW'T+{#vS'W%k'dpOX%TXY%cYZ%TZ[%c[p%Tpq%cqt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$f%T$f$g%c$g#BY2`#BY#BZ!@Y#BZ$IS2`$IS$I_!@Y$I_$JT2`$JT$JU!@Y$JU$KV2`$KV$KW!@Y$KW&FU2`&FU&FV!@Y&FV?HT2`?HT?HU!@Y?HU~2`,T!CO_$QW'U+{#vS'W%k'dpOt%Ttu2`u}%T}!O3j!O!Q%T!Q![2`![!^%T!_!c%T!c!}2`!}#R%T#R#S2`#S#T%T#T#o2`#p$g%T$g~2`",
      tokenizers: [noSemicolon, incdecToken, template, 0, 1, 2, 3, 4, 5, 6, 7, 8, insertSemicolon],
      topRules: { "Script": [0, 6] },
      dialects: { jsx: 11282, ts: 11284 },
      dynamicPrecedences: { "145": 1, "172": 1 },
      specialized: [{ term: 284, get: (value, stack) => tsExtends(value, stack) << 1 }, { term: 284, get: (value) => spec_identifier[value] || -1 }, { term: 296, get: (value) => spec_word[value] || -1 }, { term: 59, get: (value) => spec_LessThan[value] || -1 }],
      tokenPrec: 11305
    });
  }
});

// node_modules/@codemirror/lang-javascript/dist/index.js
function javascript(config = {}) {
  let lang = config.jsx ? config.typescript ? tsxLanguage : jsxLanguage : config.typescript ? typescriptLanguage : javascriptLanguage;
  return new LanguageSupport(lang, javascriptLanguage.data.of({
    autocomplete: ifNotIn(["LineComment", "BlockComment", "String"], completeFromList(snippets))
  }));
}
var snippets, javascriptLanguage, typescriptLanguage, jsxLanguage, tsxLanguage;
var init_dist10 = __esm({
  "node_modules/@codemirror/lang-javascript/dist/index.js"() {
    init_shims();
    init_index_es2();
    init_dist6();
    init_dist8();
    init_dist7();
    snippets = [
      /* @__PURE__ */ snippetCompletion("function ${name}(${params}) {\n	${}\n}", {
        label: "function",
        detail: "definition",
        type: "keyword"
      }),
      /* @__PURE__ */ snippetCompletion("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
        label: "for",
        detail: "loop",
        type: "keyword"
      }),
      /* @__PURE__ */ snippetCompletion("for (let ${name} of ${collection}) {\n	${}\n}", {
        label: "for",
        detail: "of loop",
        type: "keyword"
      }),
      /* @__PURE__ */ snippetCompletion("try {\n	${}\n} catch (${error}) {\n	${}\n}", {
        label: "try",
        detail: "block",
        type: "keyword"
      }),
      /* @__PURE__ */ snippetCompletion("class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}", {
        label: "class",
        detail: "definition",
        type: "keyword"
      }),
      /* @__PURE__ */ snippetCompletion('import {${names}} from "${module}"\n${}', {
        label: "import",
        detail: "named",
        type: "keyword"
      }),
      /* @__PURE__ */ snippetCompletion('import ${name} from "${module}"\n${}', {
        label: "import",
        detail: "default",
        type: "keyword"
      })
    ];
    javascriptLanguage = /* @__PURE__ */ LRLanguage.define({
      parser: /* @__PURE__ */ parser.configure({
        props: [
          /* @__PURE__ */ indentNodeProp.add({
            IfStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|else\b)/ }),
            TryStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|catch\b|finally\b)/ }),
            LabeledStatement: flatIndent,
            SwitchBody: (context) => {
              let after = context.textAfter, closed = /^\s*\}/.test(after), isCase = /^\s*(case|default)\b/.test(after);
              return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
            },
            Block: /* @__PURE__ */ delimitedIndent({ closing: "}" }),
            ArrowFunction: (cx) => cx.baseIndent + cx.unit,
            "TemplateString BlockComment": () => -1,
            "Statement Property": /* @__PURE__ */ continuedIndent({ except: /^{/ }),
            JSXElement(context) {
              let closed = /^\s*<\//.test(context.textAfter);
              return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
            },
            JSXEscape(context) {
              let closed = /\s*\}/.test(context.textAfter);
              return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
            },
            "JSXOpenTag JSXSelfClosingTag"(context) {
              return context.column(context.node.from) + context.unit;
            }
          }),
          /* @__PURE__ */ foldNodeProp.add({
            "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression": foldInside,
            BlockComment(tree) {
              return { from: tree.from + 2, to: tree.to - 2 };
            }
          }),
          /* @__PURE__ */ styleTags({
            "get set async static": tags.modifier,
            "for while do if else switch try catch finally return throw break continue default case": tags.controlKeyword,
            "in of await yield void typeof delete instanceof": tags.operatorKeyword,
            "export import let var const function class extends": tags.definitionKeyword,
            "with debugger from as new": tags.keyword,
            TemplateString: /* @__PURE__ */ tags.special(tags.string),
            Super: tags.atom,
            BooleanLiteral: tags.bool,
            this: tags.self,
            null: tags.null,
            Star: tags.modifier,
            VariableName: tags.variableName,
            "CallExpression/VariableName": /* @__PURE__ */ tags.function(tags.variableName),
            VariableDefinition: /* @__PURE__ */ tags.definition(tags.variableName),
            Label: tags.labelName,
            PropertyName: tags.propertyName,
            PrivatePropertyName: /* @__PURE__ */ tags.special(tags.propertyName),
            "CallExpression/MemberExpression/PropertyName": /* @__PURE__ */ tags.function(tags.propertyName),
            "FunctionDeclaration/VariableDefinition": /* @__PURE__ */ tags.function(/* @__PURE__ */ tags.definition(tags.variableName)),
            "ClassDeclaration/VariableDefinition": /* @__PURE__ */ tags.definition(tags.className),
            PropertyDefinition: /* @__PURE__ */ tags.definition(tags.propertyName),
            PrivatePropertyDefinition: /* @__PURE__ */ tags.definition(/* @__PURE__ */ tags.special(tags.propertyName)),
            UpdateOp: tags.updateOperator,
            LineComment: tags.lineComment,
            BlockComment: tags.blockComment,
            Number: tags.number,
            String: tags.string,
            ArithOp: tags.arithmeticOperator,
            LogicOp: tags.logicOperator,
            BitOp: tags.bitwiseOperator,
            CompareOp: tags.compareOperator,
            RegExp: tags.regexp,
            Equals: tags.definitionOperator,
            "Arrow : Spread": tags.punctuation,
            "( )": tags.paren,
            "[ ]": tags.squareBracket,
            "{ }": tags.brace,
            ".": tags.derefOperator,
            ", ;": tags.separator,
            TypeName: tags.typeName,
            TypeDefinition: /* @__PURE__ */ tags.definition(tags.typeName),
            "type enum interface implements namespace module declare": tags.definitionKeyword,
            "abstract global privacy readonly override": tags.modifier,
            "is keyof unique infer": tags.operatorKeyword,
            JSXAttributeValue: tags.attributeValue,
            JSXText: tags.content,
            "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": tags.angleBracket,
            "JSXIdentifier JSXNameSpacedName": tags.tagName,
            "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": tags.attributeName
          })
        ]
      }),
      languageData: {
        closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
        commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
        indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
        wordChars: "$"
      }
    });
    typescriptLanguage = /* @__PURE__ */ javascriptLanguage.configure({ dialect: "ts" });
    jsxLanguage = /* @__PURE__ */ javascriptLanguage.configure({ dialect: "jsx" });
    tsxLanguage = /* @__PURE__ */ javascriptLanguage.configure({ dialect: "jsx ts" });
  }
});

// node_modules/split.js/dist/split.js
var require_split = __commonJS({
  "node_modules/split.js/dist/split.js"(exports, module2) {
    init_shims();
    (function(global2, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Split = factory());
    })(exports, function() {
      "use strict";
      var global2 = typeof window !== "undefined" ? window : null;
      var ssr = global2 === null;
      var document2 = !ssr ? global2.document : void 0;
      var addEventListener = "addEventListener";
      var removeEventListener = "removeEventListener";
      var getBoundingClientRect = "getBoundingClientRect";
      var gutterStartDragging = "_a";
      var aGutterSize = "_b";
      var bGutterSize = "_c";
      var HORIZONTAL = "horizontal";
      var NOOP = function() {
        return false;
      };
      var calc = ssr ? "calc" : ["", "-webkit-", "-moz-", "-o-"].filter(function(prefix) {
        var el = document2.createElement("div");
        el.style.cssText = "width:" + prefix + "calc(9px)";
        return !!el.style.length;
      }).shift() + "calc";
      var isString = function(v) {
        return typeof v === "string" || v instanceof String;
      };
      var elementOrSelector = function(el) {
        if (isString(el)) {
          var ele = document2.querySelector(el);
          if (!ele) {
            throw new Error("Selector " + el + " did not match a DOM element");
          }
          return ele;
        }
        return el;
      };
      var getOption = function(options2, propName, def) {
        var value = options2[propName];
        if (value !== void 0) {
          return value;
        }
        return def;
      };
      var getGutterSize = function(gutterSize, isFirst, isLast, gutterAlign) {
        if (isFirst) {
          if (gutterAlign === "end") {
            return 0;
          }
          if (gutterAlign === "center") {
            return gutterSize / 2;
          }
        } else if (isLast) {
          if (gutterAlign === "start") {
            return 0;
          }
          if (gutterAlign === "center") {
            return gutterSize / 2;
          }
        }
        return gutterSize;
      };
      var defaultGutterFn = function(i2, gutterDirection) {
        var gut = document2.createElement("div");
        gut.className = "gutter gutter-" + gutterDirection;
        return gut;
      };
      var defaultElementStyleFn = function(dim, size, gutSize) {
        var style = {};
        if (!isString(size)) {
          style[dim] = calc + "(" + size + "% - " + gutSize + "px)";
        } else {
          style[dim] = size;
        }
        return style;
      };
      var defaultGutterStyleFn = function(dim, gutSize) {
        var obj;
        return obj = {}, obj[dim] = gutSize + "px", obj;
      };
      var Split = function(idsOption, options2) {
        if (options2 === void 0)
          options2 = {};
        if (ssr) {
          return {};
        }
        var ids = idsOption;
        var dimension;
        var clientAxis;
        var position;
        var positionEnd;
        var clientSize;
        var elements;
        if (Array.from) {
          ids = Array.from(ids);
        }
        var firstElement = elementOrSelector(ids[0]);
        var parent = firstElement.parentNode;
        var parentStyle = getComputedStyle ? getComputedStyle(parent) : null;
        var parentFlexDirection = parentStyle ? parentStyle.flexDirection : null;
        var sizes = getOption(options2, "sizes") || ids.map(function() {
          return 100 / ids.length;
        });
        var minSize = getOption(options2, "minSize", 100);
        var minSizes = Array.isArray(minSize) ? minSize : ids.map(function() {
          return minSize;
        });
        var maxSize = getOption(options2, "maxSize", Infinity);
        var maxSizes = Array.isArray(maxSize) ? maxSize : ids.map(function() {
          return maxSize;
        });
        var expandToMin = getOption(options2, "expandToMin", false);
        var gutterSize = getOption(options2, "gutterSize", 10);
        var gutterAlign = getOption(options2, "gutterAlign", "center");
        var snapOffset = getOption(options2, "snapOffset", 30);
        var dragInterval = getOption(options2, "dragInterval", 1);
        var direction = getOption(options2, "direction", HORIZONTAL);
        var cursor = getOption(options2, "cursor", direction === HORIZONTAL ? "col-resize" : "row-resize");
        var gutter = getOption(options2, "gutter", defaultGutterFn);
        var elementStyle = getOption(options2, "elementStyle", defaultElementStyleFn);
        var gutterStyle = getOption(options2, "gutterStyle", defaultGutterStyleFn);
        if (direction === HORIZONTAL) {
          dimension = "width";
          clientAxis = "clientX";
          position = "left";
          positionEnd = "right";
          clientSize = "clientWidth";
        } else if (direction === "vertical") {
          dimension = "height";
          clientAxis = "clientY";
          position = "top";
          positionEnd = "bottom";
          clientSize = "clientHeight";
        }
        function setElementSize(el, size, gutSize, i2) {
          var style = elementStyle(dimension, size, gutSize, i2);
          Object.keys(style).forEach(function(prop) {
            el.style[prop] = style[prop];
          });
        }
        function setGutterSize(gutterElement, gutSize, i2) {
          var style = gutterStyle(dimension, gutSize, i2);
          Object.keys(style).forEach(function(prop) {
            gutterElement.style[prop] = style[prop];
          });
        }
        function getSizes() {
          return elements.map(function(element) {
            return element.size;
          });
        }
        function getMousePosition(e2) {
          if ("touches" in e2) {
            return e2.touches[0][clientAxis];
          }
          return e2[clientAxis];
        }
        function adjust(offset) {
          var a = elements[this.a];
          var b = elements[this.b];
          var percentage = a.size + b.size;
          a.size = offset / this.size * percentage;
          b.size = percentage - offset / this.size * percentage;
          setElementSize(a.element, a.size, this[aGutterSize], a.i);
          setElementSize(b.element, b.size, this[bGutterSize], b.i);
        }
        function drag(e2) {
          var offset;
          var a = elements[this.a];
          var b = elements[this.b];
          if (!this.dragging) {
            return;
          }
          offset = getMousePosition(e2) - this.start + (this[aGutterSize] - this.dragOffset);
          if (dragInterval > 1) {
            offset = Math.round(offset / dragInterval) * dragInterval;
          }
          if (offset <= a.minSize + snapOffset + this[aGutterSize]) {
            offset = a.minSize + this[aGutterSize];
          } else if (offset >= this.size - (b.minSize + snapOffset + this[bGutterSize])) {
            offset = this.size - (b.minSize + this[bGutterSize]);
          }
          if (offset >= a.maxSize - snapOffset + this[aGutterSize]) {
            offset = a.maxSize + this[aGutterSize];
          } else if (offset <= this.size - (b.maxSize - snapOffset + this[bGutterSize])) {
            offset = this.size - (b.maxSize + this[bGutterSize]);
          }
          adjust.call(this, offset);
          getOption(options2, "onDrag", NOOP)(getSizes());
        }
        function calculateSizes() {
          var a = elements[this.a].element;
          var b = elements[this.b].element;
          var aBounds = a[getBoundingClientRect]();
          var bBounds = b[getBoundingClientRect]();
          this.size = aBounds[dimension] + bBounds[dimension] + this[aGutterSize] + this[bGutterSize];
          this.start = aBounds[position];
          this.end = aBounds[positionEnd];
        }
        function innerSize(element) {
          if (!getComputedStyle) {
            return null;
          }
          var computedStyle = getComputedStyle(element);
          if (!computedStyle) {
            return null;
          }
          var size = element[clientSize];
          if (size === 0) {
            return null;
          }
          if (direction === HORIZONTAL) {
            size -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
          } else {
            size -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
          }
          return size;
        }
        function trimToMin(sizesToTrim) {
          var parentSize = innerSize(parent);
          if (parentSize === null) {
            return sizesToTrim;
          }
          if (minSizes.reduce(function(a, b) {
            return a + b;
          }, 0) > parentSize) {
            return sizesToTrim;
          }
          var excessPixels = 0;
          var toSpare = [];
          var pixelSizes = sizesToTrim.map(function(size, i2) {
            var pixelSize = parentSize * size / 100;
            var elementGutterSize = getGutterSize(gutterSize, i2 === 0, i2 === sizesToTrim.length - 1, gutterAlign);
            var elementMinSize = minSizes[i2] + elementGutterSize;
            if (pixelSize < elementMinSize) {
              excessPixels += elementMinSize - pixelSize;
              toSpare.push(0);
              return elementMinSize;
            }
            toSpare.push(pixelSize - elementMinSize);
            return pixelSize;
          });
          if (excessPixels === 0) {
            return sizesToTrim;
          }
          return pixelSizes.map(function(pixelSize, i2) {
            var newPixelSize = pixelSize;
            if (excessPixels > 0 && toSpare[i2] - excessPixels > 0) {
              var takenPixels = Math.min(excessPixels, toSpare[i2] - excessPixels);
              excessPixels -= takenPixels;
              newPixelSize = pixelSize - takenPixels;
            }
            return newPixelSize / parentSize * 100;
          });
        }
        function stopDragging() {
          var self2 = this;
          var a = elements[self2.a].element;
          var b = elements[self2.b].element;
          if (self2.dragging) {
            getOption(options2, "onDragEnd", NOOP)(getSizes());
          }
          self2.dragging = false;
          global2[removeEventListener]("mouseup", self2.stop);
          global2[removeEventListener]("touchend", self2.stop);
          global2[removeEventListener]("touchcancel", self2.stop);
          global2[removeEventListener]("mousemove", self2.move);
          global2[removeEventListener]("touchmove", self2.move);
          self2.stop = null;
          self2.move = null;
          a[removeEventListener]("selectstart", NOOP);
          a[removeEventListener]("dragstart", NOOP);
          b[removeEventListener]("selectstart", NOOP);
          b[removeEventListener]("dragstart", NOOP);
          a.style.userSelect = "";
          a.style.webkitUserSelect = "";
          a.style.MozUserSelect = "";
          a.style.pointerEvents = "";
          b.style.userSelect = "";
          b.style.webkitUserSelect = "";
          b.style.MozUserSelect = "";
          b.style.pointerEvents = "";
          self2.gutter.style.cursor = "";
          self2.parent.style.cursor = "";
          document2.body.style.cursor = "";
        }
        function startDragging(e2) {
          if ("button" in e2 && e2.button !== 0) {
            return;
          }
          var self2 = this;
          var a = elements[self2.a].element;
          var b = elements[self2.b].element;
          if (!self2.dragging) {
            getOption(options2, "onDragStart", NOOP)(getSizes());
          }
          e2.preventDefault();
          self2.dragging = true;
          self2.move = drag.bind(self2);
          self2.stop = stopDragging.bind(self2);
          global2[addEventListener]("mouseup", self2.stop);
          global2[addEventListener]("touchend", self2.stop);
          global2[addEventListener]("touchcancel", self2.stop);
          global2[addEventListener]("mousemove", self2.move);
          global2[addEventListener]("touchmove", self2.move);
          a[addEventListener]("selectstart", NOOP);
          a[addEventListener]("dragstart", NOOP);
          b[addEventListener]("selectstart", NOOP);
          b[addEventListener]("dragstart", NOOP);
          a.style.userSelect = "none";
          a.style.webkitUserSelect = "none";
          a.style.MozUserSelect = "none";
          a.style.pointerEvents = "none";
          b.style.userSelect = "none";
          b.style.webkitUserSelect = "none";
          b.style.MozUserSelect = "none";
          b.style.pointerEvents = "none";
          self2.gutter.style.cursor = cursor;
          self2.parent.style.cursor = cursor;
          document2.body.style.cursor = cursor;
          calculateSizes.call(self2);
          self2.dragOffset = getMousePosition(e2) - self2.end;
        }
        sizes = trimToMin(sizes);
        var pairs = [];
        elements = ids.map(function(id2, i2) {
          var element = {
            element: elementOrSelector(id2),
            size: sizes[i2],
            minSize: minSizes[i2],
            maxSize: maxSizes[i2],
            i: i2
          };
          var pair2;
          if (i2 > 0) {
            pair2 = {
              a: i2 - 1,
              b: i2,
              dragging: false,
              direction,
              parent
            };
            pair2[aGutterSize] = getGutterSize(gutterSize, i2 - 1 === 0, false, gutterAlign);
            pair2[bGutterSize] = getGutterSize(gutterSize, false, i2 === ids.length - 1, gutterAlign);
            if (parentFlexDirection === "row-reverse" || parentFlexDirection === "column-reverse") {
              var temp = pair2.a;
              pair2.a = pair2.b;
              pair2.b = temp;
            }
          }
          if (i2 > 0) {
            var gutterElement = gutter(i2, direction, element.element);
            setGutterSize(gutterElement, gutterSize, i2);
            pair2[gutterStartDragging] = startDragging.bind(pair2);
            gutterElement[addEventListener]("mousedown", pair2[gutterStartDragging]);
            gutterElement[addEventListener]("touchstart", pair2[gutterStartDragging]);
            parent.insertBefore(gutterElement, element.element);
            pair2.gutter = gutterElement;
          }
          setElementSize(element.element, element.size, getGutterSize(gutterSize, i2 === 0, i2 === ids.length - 1, gutterAlign), i2);
          if (i2 > 0) {
            pairs.push(pair2);
          }
          return element;
        });
        function adjustToMin(element) {
          var isLast = element.i === pairs.length;
          var pair2 = isLast ? pairs[element.i - 1] : pairs[element.i];
          calculateSizes.call(pair2);
          var size = isLast ? pair2.size - element.minSize - pair2[bGutterSize] : element.minSize + pair2[aGutterSize];
          adjust.call(pair2, size);
        }
        elements.forEach(function(element) {
          var computedSize = element.element[getBoundingClientRect]()[dimension];
          if (computedSize < element.minSize) {
            if (expandToMin) {
              adjustToMin(element);
            } else {
              element.minSize = computedSize;
            }
          }
        });
        function setSizes(newSizes) {
          var trimmed = trimToMin(newSizes);
          trimmed.forEach(function(newSize, i2) {
            if (i2 > 0) {
              var pair2 = pairs[i2 - 1];
              var a = elements[pair2.a];
              var b = elements[pair2.b];
              a.size = trimmed[i2 - 1];
              b.size = newSize;
              setElementSize(a.element, a.size, pair2[aGutterSize], a.i);
              setElementSize(b.element, b.size, pair2[bGutterSize], b.i);
            }
          });
        }
        function destroy(preserveStyles, preserveGutter) {
          pairs.forEach(function(pair2) {
            if (preserveGutter !== true) {
              pair2.parent.removeChild(pair2.gutter);
            } else {
              pair2.gutter[removeEventListener]("mousedown", pair2[gutterStartDragging]);
              pair2.gutter[removeEventListener]("touchstart", pair2[gutterStartDragging]);
            }
            if (preserveStyles !== true) {
              var style = elementStyle(dimension, pair2.a.size, pair2[aGutterSize]);
              Object.keys(style).forEach(function(prop) {
                elements[pair2.a].element.style[prop] = "";
                elements[pair2.b].element.style[prop] = "";
              });
            }
          });
        }
        return {
          setSizes,
          getSizes,
          collapse: function collapse(i2) {
            adjustToMin(elements[i2]);
          },
          destroy,
          parent,
          pairs
        };
      };
      return Split;
    });
  }
});

// .svelte-kit/output/server/chunks/__layout-24fd9d3e.js
var layout_24fd9d3e_exports = {};
__export(layout_24fd9d3e_exports, {
  default: () => _layout2
});
function notificationsStore(initialValue = []) {
  const store = writable2(initialValue);
  const { set, update, subscribe: subscribe2 } = store;
  let defaultOptions = {
    duration: 3e3,
    placement: "bottom-right",
    type: "info",
    theme: "dark"
  };
  function add(options2) {
    const {
      duration = 3e3,
      placement = "bottom-right",
      type = "info",
      theme: theme2 = "dark",
      ...rest
    } = { ...defaultOptions, ...options2 };
    const uid = Date.now();
    const obj = {
      ...rest,
      uid,
      placement,
      type,
      theme: theme2,
      duration,
      remove: () => {
        update((v) => v.filter((i2) => i2.uid !== uid));
      },
      update: (data) => {
        delete data.uid;
        const index2 = get_store_value(store)?.findIndex((v) => v?.uid === uid);
        if (index2 > -1) {
          update((v) => [
            ...v.slice(0, index2),
            { ...v[index2], ...data },
            ...v.slice(index2 + 1)
          ]);
        }
      }
    };
    update((v) => [...v, obj]);
    if (duration > 0) {
      setTimeout(() => {
        obj.remove();
        if (typeof obj.onRemove === "function")
          obj.onRemove();
      }, duration);
    }
    return obj;
  }
  function getById(uid) {
    return get_store_value(store)?.find((v) => v?.uid === uid);
  }
  function clearAll() {
    set([]);
  }
  function clearLast() {
    update((v) => {
      return v.slice(0, v.length - 1);
    });
  }
  function setDefaults(options2) {
    defaultOptions = { ...defaultOptions, ...options2 };
  }
  return {
    subscribe: subscribe2,
    add,
    success: getHelper("success", add),
    info: getHelper("info", add),
    error: getHelper("error", add),
    warning: getHelper("warning", add),
    clearAll,
    clearLast,
    getById,
    setDefaults
  };
}
function getHelper(type, add) {
  return function() {
    if (typeof arguments[0] === "object") {
      const options2 = arguments[0];
      return add({ ...options2, type });
    } else if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
      const options2 = arguments[2] || {};
      return add({
        ...options2,
        type,
        title: arguments[0],
        description: arguments[1]
      });
    } else if (typeof arguments[0] === "string") {
      const options2 = arguments[1] || {};
      return add({
        ...options2,
        type,
        description: arguments[0]
      });
    }
  };
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i2) => {
      return get_interpolator(a[i2], bi);
    });
    return (t3) => arr.map((fn) => fn(t3));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t3) => new Date(a + t3 * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t3) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t3);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t3) => a + t3 * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable2(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
var import_split, toasts, css$2, ToastContainer, css$12, FlatToast, Editor, css3, _layout2;
var init_layout_24fd9d3e = __esm({
  ".svelte-kit/output/server/chunks/__layout-24fd9d3e.js"() {
    init_shims();
    init_app_17a768d9();
    init_dist10();
    init_stores_8f888745();
    import_split = __toModule(require_split());
    init_ssr();
    toasts = notificationsStore([]);
    css$2 = {
      code: "ul.svelte-1rg6zyw.svelte-1rg6zyw{list-style:none;margin:0;padding:0}li.svelte-1rg6zyw.svelte-1rg6zyw{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.toast-container.svelte-1rg6zyw.svelte-1rg6zyw{z-index:9999;position:fixed;padding:4px;box-sizing:border-box;color:#fff;width:max-content;max-width:100%;pointer-events:none}.toast-container.bottom-right.svelte-1rg6zyw.svelte-1rg6zyw{bottom:1em;right:1em}.toast-container.bottom-left.svelte-1rg6zyw.svelte-1rg6zyw{bottom:1em;left:1em}.toast-container.top-left.svelte-1rg6zyw.svelte-1rg6zyw{top:1em;left:1em}.toast-container.top-right.svelte-1rg6zyw.svelte-1rg6zyw{top:1em;right:1em}.toast-container.top-center.svelte-1rg6zyw.svelte-1rg6zyw{top:1em;right:50%;left:50%;transform:translate(-50%, 0)}.toast-container.bottom-center.svelte-1rg6zyw.svelte-1rg6zyw{bottom:1em;right:50%;left:50%;transform:translate(-50%, 0)}.toast-container.center-center.svelte-1rg6zyw.svelte-1rg6zyw{top:50%;right:50%;left:50%;transform:translate(-50%, -50%)}.toast-container.svelte-1rg6zyw>.svelte-1rg6zyw:not(:last-child){margin-bottom:10px}",
      map: null
    };
    ToastContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $toasts, $$unsubscribe_toasts;
      $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
      let { theme: theme2 = "dark" } = $$props;
      let { placement = "bottom-right" } = $$props;
      let { type = "info" } = $$props;
      let { showProgress = false } = $$props;
      let { duration = 3e3 } = $$props;
      let { width = "320px" } = $$props;
      const placements = [
        "bottom-right",
        "bottom-left",
        "top-right",
        "top-left",
        "top-center",
        "bottom-center",
        "center-center"
      ];
      if ($$props.theme === void 0 && $$bindings.theme && theme2 !== void 0)
        $$bindings.theme(theme2);
      if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      if ($$props.showProgress === void 0 && $$bindings.showProgress && showProgress !== void 0)
        $$bindings.showProgress(showProgress);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
        $$bindings.duration(duration);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      $$result.css.add(css$2);
      $$unsubscribe_toasts();
      return `${each(placements, (placement2) => `<div class="${"toast-container " + escape2(placement2) + " svelte-1rg6zyw"}" style="${"width: " + escape2(width)}"><ul class="${"svelte-1rg6zyw"}">${each($toasts.filter((n) => n.placement === placement2).reverse(), (toast) => `<li class="${"svelte-1rg6zyw"}">${toast.component ? `${validate_component(toast.component || missing_component, "svelte:component").$$render($$result, { data: toast }, {}, {})}` : `${slots.default ? slots.default({ data: toast }) : ``}`}
        </li>`)}</ul>
  </div>`)}`;
    });
    css$12 = {
      code: ".st-toast.svelte-is9c7e.svelte-is9c7e{display:flex;pointer-events:auto;width:320px;height:auto;padding-left:0.875rem;color:#fff;box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.2);position:relative;cursor:pointer}.st-toast.svelte-is9c7e .st-toast-icon.svelte-is9c7e{flex-shrink:0;margin-right:0.875rem;margin-top:0.875rem}.st-toast.svelte-is9c7e progress[value].svelte-is9c7e{appearance:none;display:block;width:100%;position:absolute;bottom:0;left:0;right:0;height:4px}.st-toast.dark.svelte-is9c7e.svelte-is9c7e{color:#fff;background:#393939}.st-toast.dark.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:#393939}.st-toast.dark.svelte-is9c7e .st-toast-close-btn svg.svelte-is9c7e{fill:#fff}.st-toast.dark.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px #fff}.st-toast.dark.success.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(22, 163, 74)}.st-toast.dark.success.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(22, 163, 74);color:#fff}.st-toast.dark.success.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(22, 163, 74)}.st-toast.dark.info.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(2, 132, 199)}.st-toast.dark.info.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(2, 132, 199);color:#fff}.st-toast.dark.info.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(2, 132, 199)}.st-toast.dark.error.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(225, 29, 72)}.st-toast.dark.error.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(225, 29, 72);color:#fff}.st-toast.dark.error.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(225, 29, 72)}.st-toast.dark.warning.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(202, 138, 4)}.st-toast.dark.warning.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(202, 138, 4);color:#fff}.st-toast.dark.warning.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(202, 138, 4)}.st-toast.light.svelte-is9c7e.svelte-is9c7e{color:#161616;fill:#161616}.st-toast.light.success.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(22, 163, 74);background:rgba(22, 163, 74, 0.2)}.st-toast.light.success.svelte-is9c7e progress.svelte-is9c7e{background:rgba(22, 163, 74, 0.2)}.st-toast.light.success.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:transparent}.st-toast.light.success.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(22, 163, 74)}.st-toast.light.success.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(22, 163, 74)}.st-toast.light.success.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px rgb(22, 163, 74)}.st-toast.light.success.svelte-is9c7e.svelte-is9c7e::before{border-color:rgb(22, 163, 74);content:'';pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;filter:opacity(0.4);border-style:solid;border-width:1px 1px 1px 0}.st-toast.light.info.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(2, 132, 199);background:rgba(2, 132, 199, 0.2)}.st-toast.light.info.svelte-is9c7e progress.svelte-is9c7e{background:rgba(2, 132, 199, 0.2)}.st-toast.light.info.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:transparent}.st-toast.light.info.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(2, 132, 199)}.st-toast.light.info.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(2, 132, 199)}.st-toast.light.info.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px rgb(2, 132, 199)}.st-toast.light.info.svelte-is9c7e.svelte-is9c7e::before{border-color:rgb(2, 132, 199);content:'';pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;filter:opacity(0.4);border-style:solid;border-width:1px 1px 1px 0}.st-toast.light.error.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(225, 29, 72);background:rgba(225, 29, 72, 0.2)}.st-toast.light.error.svelte-is9c7e progress.svelte-is9c7e{background:rgba(225, 29, 72, 0.2)}.st-toast.light.error.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:transparent}.st-toast.light.error.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(225, 29, 72)}.st-toast.light.error.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(225, 29, 72)}.st-toast.light.error.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px rgb(225, 29, 72)}.st-toast.light.error.svelte-is9c7e.svelte-is9c7e::before{border-color:rgb(225, 29, 72);content:'';pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;filter:opacity(0.4);border-style:solid;border-width:1px 1px 1px 0}.st-toast.light.warning.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(202, 138, 4);background:rgba(202, 138, 4, 0.2)}.st-toast.light.warning.svelte-is9c7e progress.svelte-is9c7e{background:rgba(202, 138, 4, 0.2)}.st-toast.light.warning.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:transparent}.st-toast.light.warning.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(202, 138, 4)}.st-toast.light.warning.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(202, 138, 4)}.st-toast.light.warning.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px rgb(202, 138, 4)}.st-toast.light.warning.svelte-is9c7e.svelte-is9c7e::before{border-color:rgb(202, 138, 4);content:'';pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;filter:opacity(0.4);border-style:solid;border-width:1px 1px 1px 0}.st-toast-details.svelte-is9c7e.svelte-is9c7e{margin-top:0.875rem;margin-right:1rem;text-align:left;align-self:flex-start}.st-toast-details.svelte-is9c7e .st-toast-title.svelte-is9c7e{font-size:0.875rem;font-weight:600;line-height:1.125rem;letter-spacing:0.16px;font-weight:600;word-break:break-word;margin:0;outline:none}.st-toast-details.svelte-is9c7e .st-toast-description.svelte-is9c7e{font-size:0.875rem;font-weight:400;line-height:1.125rem;letter-spacing:0.16px;margin-top:0;margin-bottom:1rem;word-break:break-word}.st-toast-close-btn.svelte-is9c7e.svelte-is9c7e{outline:2px solid transparent;outline-offset:-2px;display:flex;align-items:center;justify-content:center;background-color:transparent;border:none;cursor:pointer;margin-left:auto;padding:0;height:3rem;width:3rem;min-height:3rem;min-width:3rem;transition:outline 110ms, background-color 110ms}",
      map: null
    };
    FlatToast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $progress, $$unsubscribe_progress;
      let { theme: theme2 = "light" } = $$props;
      let { data = {} } = $$props;
      const progress = tweened(1, { duration: data.duration, easing: identity });
      $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
      if ($$props.theme === void 0 && $$bindings.theme && theme2 !== void 0)
        $$bindings.theme(theme2);
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      $$result.css.add(css$12);
      $$unsubscribe_progress();
      return `<div class="${"st-toast flat " + escape2(data.theme || theme2) + " " + escape2(data.type || "info") + " svelte-is9c7e"}" role="${"alert"}" aria-live="${"assertive"}" aria-atomic="${"true"}">${slots.icon ? slots.icon({}) : `
    ${data.type === "success" ? `<svg class="${"st-toast-icon svelte-is9c7e"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"20"}" height="${"20"}" viewBox="${"0 0 20 20"}" aria-hidden="${"true"}"><path d="${"M10,1c-4.9,0-9,4.1-9,9s4.1,9,9,9s9-4,9-9S15,1,10,1z M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"}"></path><path fill="${"none"}" d="${"M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path></svg>` : `${data.type === "info" ? `<svg class="${"st-toast-icon svelte-is9c7e"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"20"}" height="${"20"}" viewBox="${"0 0 32 32"}" aria-hidden="${"true"}"><path d="${"M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,7Zm4,17.12H12V21.88h2.88V15.12H13V12.88h4.13v9H20Z"}"></path></svg>` : `${data.type === "error" ? `<svg class="${"st-toast-icon svelte-is9c7e"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"20"}" height="${"20"}" viewBox="${"0 0 20 20"}" aria-hidden="${"true"}"><path d="${"M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"}"></path><path d="${"M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path></svg>` : `<svg class="${"st-toast-icon svelte-is9c7e"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"20"}" height="${"20"}" viewBox="${"0 0 20 20"}" aria-hidden="${"true"}"><path d="${"M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1	s1,0.4,1,1S10.6,16,10,16z"}"></path><path d="${"M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z"}" data-icon-path="${"inner-path"}" opacity="${"0"}"></path></svg>`}`}`}
  `}

  <div class="${"st-toast-details svelte-is9c7e"}">${data.title ? `<h3 class="${"st-toast-title svelte-is9c7e"}">${escape2(data.title)}</h3>` : ``}

    <p class="${"st-toast-description svelte-is9c7e"}">${escape2(data.description)}</p>
    <div class="${"st-toast-extra"}">${slots.extra ? slots.extra({}) : ``}</div></div>
  <button class="${"st-toast-close-btn svelte-is9c7e"}" type="${"button"}" aria-label="${"close"}">${slots["close-icon"] ? slots["close-icon"]({}) : `
      <svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"bx--toast-notification__close-icon svelte-is9c7e"}" width="${"20"}" height="${"20"}" viewBox="${"0 0 32 32"}" aria-hidden="${"true"}"><path d="${"M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"}"></path></svg>
    `}</button>
  ${data.showProgress ? `<progress style="${"height: " + escape2(data.duration > 0 ? "4px" : 0)}"${add_attribute("value", $progress, 0)} class="${"svelte-is9c7e"}"></progress>` : ``}
</div>`;
    });
    Editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let editorDiv;
      javascript();
      let consoleDiv;
      let messages = [];
      return `<div class="${"h-[100vh]"}"><div class="${"flex flex-col h-[60%] max-h-[60%] overflow-y-scroll"}"><div class="${"flex justify-evenly transition-all duration-200 " + escape2("bg-black text-white")}"><button class="${escape2("hover:bg-white hover:text-black") + " w-[50%] transition-all duration-200"}">Toggle Dark Mode</button>
			<button class="${escape2("hover:bg-white hover:text-black") + " w-[50%] transition-all duration-200"}">Run (.js)</button></div>
		<div class="${"h-full " + escape2("bg-black") + " transition-all duration-200"}"${add_attribute("this", editorDiv, 0)}></div></div>
	<div class="${"relative overflow-y-scroll w-full bottom-0 h-[40%] " + escape2("bg-white text-black") + " transition-all duration-200"}"${add_attribute("this", consoleDiv, 0)}><div class="${"flex items-center justify-center w-full p-1 " + escape2("border-b-black") + " transition-all duration-200 border-b-2 mb-1"}"><p>Console</p></div>
		<div class="${"p-1"}">${each(messages, (message) => `<p${add_classes([message.type === "error" ? "text-red-500" : ""].join(" ").trim())}>${escape2(message.message)}</p>`)}</div></div></div>

${validate_component(ToastContainer, "ToastContainer").$$render($$result, {}, {}, {
        default: ({ data }) => `${validate_component(FlatToast, "FlatToast").$$render($$result, { data }, {}, {})}`
      })}`;
    });
    css3 = {
      code: ".gutter{@apply cursor-col-resize bg-slate-500;}",
      map: null
    };
    _layout2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_favorites;
      $$unsubscribe_favorites = subscribe(favorites, (value) => value);
      $$result.css.add(css3);
      $$unsubscribe_favorites();
      return `<div class="${"flex"}"><div class="${"bg-blue-400 h-[100vh] w-[50%]"}" id="${"panel1"}">${slots.default ? slots.default({}) : ``}</div>
	<div class="${"w-[50%]"}" id="${"panel2"}">${validate_component(Editor, "Editor").$$render($$result, {}, {}, {})}</div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/index-05de7d8f.js
var index_05de7d8f_exports = {};
__export(index_05de7d8f_exports, {
  default: () => Music_1
});
var durationUnitRegex, range, css4, DoubleBounce, MdSearch, FaHome, Music, Music_1;
var init_index_05de7d8f = __esm({
  ".svelte-kit/output/server/chunks/index-05de7d8f.js"() {
    init_shims();
    init_app_17a768d9();
    init_Clock_svelte_svelte_type_style_lang_3b557eeb();
    init_stores_8f888745();
    init_ssr();
    durationUnitRegex = /[a-zA-Z]/;
    range = (size, startAt = 0) => [...Array(size).keys()].map((i2) => i2 + startAt);
    css4 = {
      code: ".wrapper.svelte-h1a2xs{position:relative;width:var(--size);height:var(--size)}.circle.svelte-h1a2xs{position:absolute;width:var(--size);height:var(--size);background-color:var(--color);border-radius:100%;opacity:0.6;top:0;left:0;animation-fill-mode:both;animation-name:svelte-h1a2xs-bounce !important}@keyframes svelte-h1a2xs-bounce{0%,100%{transform:scale(0)}50%{transform:scale(1)}}",
      map: null
    };
    DoubleBounce = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { color = "#FF3E00" } = $$props;
      let { unit = "px" } = $$props;
      let { duration = "2.1s" } = $$props;
      let { size = "60" } = $$props;
      let durationUnit = duration.match(durationUnitRegex)[0];
      let durationNum = duration.replace(durationUnitRegex, "");
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
        $$bindings.unit(unit);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
        $$bindings.duration(duration);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      $$result.css.add(css4);
      return `<div class="${"wrapper svelte-h1a2xs"}" style="${"--size: " + escape2(size) + escape2(unit) + "; --color: " + escape2(color)}">${each(range(2, 1), (version) => `<div class="${"circle svelte-h1a2xs"}" style="${"animation: " + escape2(duration) + " " + escape2(version === 1 ? `${(durationNum - 0.1) / 2}${durationUnit}` : `0s`) + " infinite ease-in-out"}"></div>`)}</div>`;
    });
    MdSearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 24 24" }, $$props), {}, {
        default: () => `<path d="${"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}"></path>`
      })}`;
    });
    FaHome = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({ viewBox: "0 0 576 512" }, $$props), {}, {
        default: () => `<path d="${"M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"}"></path>`
      })}`;
    });
    Music = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_favorites;
      $$unsubscribe_favorites = subscribe(favorites, (value) => value);
      let query = "the beatles";
      let { scroll } = $$props;
      let showFavs = false;
      if ($$props.scroll === void 0 && $$bindings.scroll && scroll !== void 0)
        $$bindings.scroll(scroll);
      $$unsubscribe_favorites();
      return `<div class="${"flex justify-around mb-8 mt-2 items-center"}"><button class="${"w-[2em]"}">${validate_component(FaHome, "Home").$$render($$result, {}, {}, {})}</button>
	<h1 class="${"text-[1.5em] md:text-[3em] font-bold"}">Music</h1>
	<div class="${"flex flex-col gap-2"}"><div class="${"self-centre"}"><form><div class="${"flex items-center gap-1"}"><input class="${"rounded-md h-[2.5em] w-[5em] md:w-[12.5em] p-2"}"${add_attribute("value", query, 0)}>
					<button class="${"rounded-md bg-green-600 p-2"}"><div class="${"flex gap-[2px] items-center"}"><div class="${"w-[1em]"}">${validate_component(MdSearch, "Search").$$render($$result, {}, {}, {})}</div>
							Search
						</div></button></div></form></div>
		<label class="${"self-end"}">Show Favorites
			<input type="${"checkbox"}"${add_attribute("checked", showFavs, 1)}></label></div></div>
<div class="${"h-[100vh] break-words"}">${`<div class="${"flex items-center justify-center h-full"}">${validate_component(DoubleBounce, "DoubleBounce").$$render($$result, { size: "40", unit: "px" }, {}, {})}</div>`}</div>`;
    });
    Music_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let div;
      return `<div class="${"overflow-y-scroll h-[100vh]"}"${add_attribute("this", div, 0)}>${validate_component(Music, "Music").$$render($$result, { scroll: () => div.scrollTop = 0 }, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/app-17a768d9.js
function noop3() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop3;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function custom_event(type, detail, bubbles = false) {
  const e2 = document.createEvent("CustomEvent");
  e2.initCustomEvent(type, bubbles, false, detail);
  return e2;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name2) {
  if (!component || !component.$$render) {
    if (name2 === "svelte:component")
      name2 += " this={...}";
    throw new Error(`<${name2}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css22) => css22.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name2, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name2}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function add_classes(classes) {
  return classes ? ` class="${classes}"` : "";
}
function afterUpdate() {
}
function set_paths(paths) {
  base2 = paths.base;
  assets = paths.assets || base2;
}
function set_prerendering(value) {
}
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-6bb87bde.js",
      css: [assets + "/_app/assets/start-d5b4de3e.css", assets + "/_app/assets/vendor-da001428.css"],
      js: [assets + "/_app/start-6bb87bde.js", assets + "/_app/chunks/vendor-27cceb42.js", assets + "/_app/chunks/singletons-12a22614.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id2) => assets + "/_app/" + entry_lookup[id2],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template: template2,
    trailing_slash: "never"
  };
}
async function load_component(file) {
  const { entry, css: css22, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css22.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var identity, is_client, now, raf, tasks, current_component, escaped2, missing_component, on_destroy, css5, Root, base2, assets, user_hooks, template2, options, default_settings, empty, manifest, get_hooks, module_lookup, metadata_lookup;
var init_app_17a768d9 = __esm({
  ".svelte-kit/output/server/chunks/app-17a768d9.js"() {
    init_shims();
    init_ssr();
    identity = (x2) => x2;
    is_client = typeof window !== "undefined";
    now = is_client ? () => window.performance.now() : () => Date.now();
    raf = is_client ? (cb) => requestAnimationFrame(cb) : noop3;
    tasks = new Set();
    Promise.resolve();
    escaped2 = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
    css5 = {
      code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
      map: null
    };
    Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { stores } = $$props;
      let { page } = $$props;
      let { components } = $$props;
      let { props_0 = null } = $$props;
      let { props_1 = null } = $$props;
      let { props_2 = null } = $$props;
      let { props_3 = null } = $$props;
      setContext("__svelte__", stores);
      afterUpdate(stores.page.notify);
      if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
        $$bindings.stores(stores);
      if ($$props.page === void 0 && $$bindings.page && page !== void 0)
        $$bindings.page(page);
      if ($$props.components === void 0 && $$bindings.components && components !== void 0)
        $$bindings.components(components);
      if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
        $$bindings.props_0(props_0);
      if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
        $$bindings.props_1(props_1);
      if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
        $$bindings.props_2(props_2);
      if ($$props.props_3 === void 0 && $$bindings.props_3 && props_3 !== void 0)
        $$bindings.props_3(props_3);
      $$result.css.add(css5);
      {
        stores.page.set(page);
      }
      return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
        default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
          default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {
            default: () => `${components[3] ? `${validate_component(components[3] || missing_component, "svelte:component").$$render($$result, Object.assign(props_3 || {}), {}, {})}` : ``}`
          })}` : ``}`
        })}` : ``}`
      })}

${``}`;
    });
    base2 = "";
    assets = "";
    user_hooks = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module"
    });
    template2 = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<meta name="description" content="" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
    options = null;
    default_settings = { paths: { "base": "", "assets": "" } };
    empty = () => ({});
    manifest = {
      assets: [{ "file": "config.mp4", "size": 879834, "type": "video/mp4" }, { "file": "editor.jpg", "size": 56162, "type": "image/jpeg" }, { "file": "favicon.png", "size": 24628, "type": "image/png" }, { "file": "musicPanel.jpg", "size": 67947, "type": "image/jpeg" }, { "file": "resize.mp4", "size": 1481264, "type": "video/mp4" }],
      layout: "src/routes/__layout.svelte",
      error: ".svelte-kit/build/components/error.svelte",
      routes: [
        {
          type: "page",
          pattern: /^\/$/,
          params: empty,
          a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
          b: [".svelte-kit/build/components/error.svelte"]
        },
        {
          type: "page",
          pattern: /^\/music\/?$/,
          params: empty,
          a: ["src/routes/__layout.svelte", "src/routes/music/__layout.svelte", "src/routes/music/index.svelte"],
          b: [".svelte-kit/build/components/error.svelte"]
        }
      ]
    };
    get_hooks = (hooks) => ({
      getSession: hooks.getSession || (() => ({})),
      handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
      handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
      externalFetch: hooks.externalFetch || fetch
    });
    module_lookup = {
      "src/routes/__layout.svelte": () => Promise.resolve().then(() => (init_layout_0079a1b8(), layout_0079a1b8_exports)),
      ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(() => (init_error_5bb8475e(), error_5bb8475e_exports)),
      "src/routes/index.svelte": () => Promise.resolve().then(() => (init_index_f73b8040(), index_f73b8040_exports)),
      "src/routes/music/__layout.svelte": () => Promise.resolve().then(() => (init_layout_24fd9d3e(), layout_24fd9d3e_exports)),
      "src/routes/music/index.svelte": () => Promise.resolve().then(() => (init_index_05de7d8f(), index_05de7d8f_exports))
    };
    metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-a7756bf9.js", "css": ["assets/pages/__layout.svelte-b4a8b7a3.css", "assets/vendor-da001428.css"], "js": ["pages/__layout.svelte-a7756bf9.js", "chunks/vendor-27cceb42.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-a5bfcaf2.js", "css": ["assets/vendor-da001428.css"], "js": ["error.svelte-a5bfcaf2.js", "chunks/vendor-27cceb42.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-fec5b0b4.js", "css": ["assets/pages/index.svelte-6b70a0bf.css", "assets/vendor-da001428.css"], "js": ["pages/index.svelte-fec5b0b4.js", "chunks/vendor-27cceb42.js", "chunks/stores-2a0b8e2c.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js"], "styles": [] }, "src/routes/music/__layout.svelte": { "entry": "pages/music/__layout.svelte-a656536a.js", "css": ["assets/pages/music/__layout.svelte-1f1f444b.css", "assets/vendor-da001428.css"], "js": ["pages/music/__layout.svelte-a656536a.js", "chunks/vendor-27cceb42.js", "chunks/stores-2a0b8e2c.js"], "styles": [] }, "src/routes/music/index.svelte": { "entry": "pages/music/index.svelte-4de7b75f.js", "css": ["assets/vendor-da001428.css"], "js": ["pages/music/index.svelte-4de7b75f.js", "chunks/vendor-27cceb42.js", "chunks/navigation-51f4a605.js", "chunks/singletons-12a22614.js", "chunks/stores-2a0b8e2c.js"], "styles": [] } };
  }
});

// .svelte-kit/netlify/entry.js
__export(exports, {
  handler: () => handler
});
init_shims();

// .svelte-kit/output/server/app.js
init_shims();
init_ssr();
init_app_17a768d9();

// .svelte-kit/netlify/entry.js
init();
async function handler(event) {
  const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const encoding = isBase64Encoded ? "base64" : headers["content-encoding"] || "utf-8";
  const rawBody = typeof body === "string" ? Buffer.from(body, encoding) : body;
  const rendered = await render({
    method: httpMethod,
    headers,
    path,
    query,
    rawBody
  });
  if (!rendered) {
    return {
      statusCode: 404,
      body: "Not found"
    };
  }
  const partial_response = {
    statusCode: rendered.status,
    ...split_headers(rendered.headers)
  };
  if (rendered.body instanceof Uint8Array) {
    return {
      ...partial_response,
      isBase64Encoded: true,
      body: Buffer.from(rendered.body).toString("base64")
    };
  }
  return {
    ...partial_response,
    body: rendered.body
  };
}
function split_headers(headers) {
  const h2 = {};
  const m2 = {};
  for (const key in headers) {
    const value = headers[key];
    const target = Array.isArray(value) ? m2 : h2;
    target[key] = value;
  }
  return {
    headers: h2,
    multiValueHeaders: m2
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*! Split.js - v1.6.4 */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
