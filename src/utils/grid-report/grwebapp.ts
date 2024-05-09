import { Modal } from 'ant-design-vue';

// 变量 webappUrl 指定WEB报表客户端安装程序的下载URL，当通过WebSocket通讯不成功时，提示用户用此URL下载程序进行安装。
let webappWebsocket: WebSocket,
  // 或用于自动更新WEB报表客户端时下载新版本，开发者应将 webappUrl 改为自己服务器的URL，方便用户从可访问的WEB服务器下载
  // "http://www.rubylong.cn/download/gridreport6-webapp.exe"
  webappUrl = 'http://www.rubylong.cn/download/gridreport6-webapp.exe',
  // 变量 webappVersion 指定自动更新时，客户端程序需要的版本号，如果小于此版本号，则自动进行更新
  webappVersion = '6.8.1.0',
  // 如果需要响应执行任务后的消息响应，应该写一个名称为 webappOnmessage 的 function
  webappOnmessage;

function webappUrlMethodValid(url, method) {
  if (!method) {
    if (typeof url == 'object') {
      method = url.method;
      url = url.url;
    }
    if (!method) {
      method = /.grf|.txt|.xml|.json/.test(url) ? 'GET' : 'POST';
    }
  }
  return method;
}

//此函数用于判断一个变量是否为URL字符串，如果类型为字符串且首个非空白字符不为“<”与“{”即判定为URL
//如果参数是一个object对象，且其具有“url”属性，则其是HTTPParam对象，是一个url参数
const webappIsUrl = (p) => {
  let index = 0,
    len = p.length,
    ch;

  //对象如果有url属性，判定为url
  if (typeof p == 'object') {
    return !!p.url;
  }

  if (typeof p != 'string') {
    return 0;
  }

  //首先找到第一个非空白字符
  while (index < len) {
    ch = p[index];
    if (!/\s/g.test(ch)) break;
    index++;
  }

  //如果不是xml或json文本串，则判定为url
  return ch != '{' && ch != '<' && p.substring(index, 4) != '_WR_';
};

const webappAjax = (method, url, callback, cbThis, params) => {
  let xmlHttp = new XMLHttpRequest(),
    headers;

  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status > 0) {
      callback.call(cbThis, xmlHttp, xmlHttp.status == 200);
    }
  };

  xmlHttp.onerror = () => {
    callback.call(cbThis, xmlHttp, 0);
  };

  if (typeof url == 'object') {
    headers = url.headers;
    if (typeof headers == 'string') {
      headers = JSON.parse(headers);
    }

    if (!method) {
      method = url.method;
    }

    if (!params) {
      params = url.data;
    }

    url = url.url;
  }

  xmlHttp.open(webappUrlMethodValid(url, method), url, true); //异步请求数据

  if (headers && typeof headers == 'object') {
    for (const key in headers) {
      xmlHttp.setRequestHeader(key, headers[key]);
    }
  }

  xmlHttp.send(params); //POST 或 PUT 可以传递参数
};

// 创建启动WEB报表客户端的URL协议参数
function grUpHref(args) {
  return `grwebapp://${args ? JSON.stringify(args) : ''}`;
}

//通过URL协议启动WEB报表客户端程序
//参数 appUpdate 指定是否自动更新WEB报表客户端程序，根据_grwebapp_version与已经安装的程序版本进行比较，按需进行自动升级
const webappProtocolStartup = (appUpdate) => {
  if (webappWebsocket && webappWebsocket.readyState === 1) {
    return; // 已经启用了
  }
  const defaultUpdate = {
    type: 'update',
    url: webappUrl,
    ver: webappVersion,
  };
  const arg = appUpdate ? defaultUpdate : 0;
  window.location.href = grUpHref(arg);
};

//如果WEB报表客户端程序未运行，先通过URL协议启动WEB报表客户端程序
//通知WEB报表客户端程序根据模板与数据的URL，以及生成类型等相关参数进行报表生成，
//检查WebSocket是否已经创建并通讯连接成功
function webappWsCheck(silence) {
  if (!silence) {
    if (!webappWebsocket) {
      Modal.error({ content: 'WebSocket没有创建，无法发送数据！' });
      return false;
    } else if (webappWebsocket.readyState !== 1) {
      Modal.error({ content: 'WebSocket正在连接中，暂不能发送数据！' });
      return false;
    }
  }
  return webappWebsocket && webappWebsocket.readyState == 1;
}

//创建并通讯连接WebSocket
function webappWsCreate(onopen) {
  //如果已经创建，且连接正常，则不要再次创建
  if (webappWebsocket && webappWebsocket.readyState === 1) {
    return;
  }

  //判断当前浏览器是否支持WebSocket
  if ('WebSocket' in window) {
    webappWebsocket = new WebSocket('ws://127.0.0.1:22333');

    //连接成功建立的回调方法
    if (onopen) {
      webappWebsocket.onopen = () => {
        onopen();
      };
    }

    //接收到消息的回调方法
    if (webappOnmessage) {
      webappWebsocket.onmessage = (event) => {
        webappOnmessage(event);
      };
    }

    webappWebsocket.onerror = () => {
      if (webappWebsocket) {
        webappWebsocket.close();
      }

      Modal.warn({
        content: `
        创建WebSocket失败，可能是WEB报表客户端程序没有启动，或其在本机没有安装。
        下载WEB报表客户端程序（${webappUrl}）安装后请重启浏览器！
      `,
      });
    };

    //连接关闭的回调方法
    webappWebsocket.onclose = () => {
      if (webappWebsocket) {
        webappWebsocket.close();
      }
    };
  } else {
    Modal.error({ content: '当前浏览器不支持HTML5的WebSocket，请选用更新版本的浏览器！' });
  }
}

function webappBuildOne(pack, report, reportMethod, data, dataMethod, callbackFun, dataParams) {
  if (!report) {
    Modal.error({ content: '在参数中没有定义报表模板的url，报表不能生成！' });
    return;
  }

  if (data) {
    if (webappIsUrl(data)) {
      webappAjax(
        dataMethod,
        data,
        (xmlHttp, success) => {
          if (success) {
            pack.data = xmlHttp.responseText;
            callbackFun();
          } else {
            window.open(data, 'blank');
          }
        },
        undefined,
        dataParams,
      );
    } else {
      pack.data = typeof data == 'object' ? JSON.stringify(data) : data;
      callbackFun();
    }
  } else {
    pack.data = '';
  }

  if (webappIsUrl(report)) {
    const callBack = (xmlHttp, success) => {
      if (success) {
        pack.report = xmlHttp.responseText;
        callbackFun();
      } else {
        window.open(report, 'blank');
      }
    };
    webappAjax(reportMethod, report, callBack, null, null);
  } else {
    pack.report = typeof report == 'object' ? JSON.stringify(report) : report;
    callbackFun();
  }
}

//将参数通过WebSocket发送给WEB报表客户端，WEB报表客户端执行对应的任务
//参数说明：
//args：
//  报表生成相关的参数，为一个结构体对象或结构体对象数组。
//  当参数为数组时，表示是执行批量任务。此时后面的 report 与 data 参数不会被用到。
//  结构体对象的各个数据项说明请参考帮助中“WEB报表(B/S报表)->WEB报表客户端->启动参数说明”部分
//report：
//  报表模板文本，报表定义格式必须为JSON格式。此参数可空，为空表示执行非报表生成任务，或WEB报表客户端通过URL获取报表模板。
//data：
//  报表数据文本，此参数可空，报表无需提供数据，或WEB报表客户端通过URL获取报表数据。
//
//  报表数据对应的 XML 或 JSON 文本，请参考帮助“WEB报表(B/S报表)->WEB报表数据”中的说明。
function webappWsRun(variantArgs, report, data) {
  function runOne(args, reportText, dataText) {
    let msg;

    if (webappWsCheck(true)) {
      if (typeof args === 'string') {
        args = {
          type: args,
        };
      }
      msg = JSON.stringify(args);

      if (reportText) {
        if (reportText.substring(0, 4) === '_WR_') {
          msg += reportText.length;
        }
        msg += reportText;

        if (dataText) {
          msg += dataText;
        }
      }

      webappWebsocket.send(msg);
    }
  } //end of runOne

  if (!webappWsCheck(1)) {
    //如果WebSocket没有连接，则首先创建并连接WebSocket，并在onopen事件中执行相关的任务
    webappWsCreate(() => {
      webappWsRun(variantArgs, report, data);
    });
    return;
  }

  if (Array.isArray(variantArgs)) {
    variantArgs.forEach((args) => {
      runOne(args, null, null);
    });
  } else {
    runOne(variantArgs, report, data);
  }
}

//通过 ajax 方式获取报表模板与报表数据，然后通过 WebSocket 发送相关数据给WEB报表客户端并生成报表
//参数既可以是单个结构体对象，也可以是结构体对象数组。如果是数组，表示成批生成多个报表。
//结构体对象的各个数据项说明请参考帮助中“WEB报表(B/S报表)->WEB报表客户端->启动参数说明”部分。
const webappAjaxRun = (variantArgs) => {
  function runOne(args) {
    const report = args.report,
      data = args.data,
      reportMethod = args.reportMethod,
      dataMethod = args.dataMethod,
      dataUrlParams = args.dataUrlParams,
      pack = { report: null, data: null };

    function run() {
      //只有当report与data都赋值之后才运行，即向WEB报表客户端程序发送数据
      if (pack.report && pack.data) {
        webappWsRun(args, pack.report, pack.data);
      }
    }

    //因为args需要传递给WEBAPP，report与data的url相关的参数不需要传递，所以将其删除掉
    delete args.report;
    delete args.data;
    delete args.reportMethod;
    delete args.dataMethod;
    delete args.dataUrlParams;

    webappBuildOne(pack, report, reportMethod, data, dataMethod, run, dataUrlParams);
  } //end of runOne

  if (!webappWsCheck(1)) {
    //如果WebSocket没有连接，则首先创建并连接WebSocket，并在onopen事件中执行相关的任务
    webappWsCreate(() => {
      webappAjaxRun(variantArgs);
    });
    return;
  }

  if (Array.isArray(variantArgs)) {
    variantArgs.forEach((args) => {
      runOne(args);
    });
  } else {
    runOne(variantArgs);
  }
};

//通过 ajax 方式获取多个报表的模板与数据，然后用 WebSocket 将数据一次性发送给WEB报表客户端程序。
//实现多个报表同时生成在一个任务中(应用Grid++Report的独立子报表功能实现)，达到多个报表同时预览、打印与数据导出
/**
 * 打印执行
 *
 * @param fileName 打印模板链接，如：outStockReport.grf
 * @param hosId 医院ID
 * @param variantData 打印数据或者列表
 */
export const previewPrint = (fileName, hosId, variantData) => {
  const prefix = import.meta.env.VUE_APP_BASE_API;
  const url = `/platformService/sysrPrint/getPrintByCode?resourceCode=${fileName}&styleCode=${fileName}.${hosId}`;
  webappProtocolStartup(null);
  const reportUrl = prefix.endsWith('/') ? `${prefix + url.substring(1)}` : `${prefix + url}`;
  previewPrintUrl(reportUrl, variantData);
};

export const previewPrintUrl = (reportUrl, variantData) => {
  if (Array.isArray(variantData)) {
    const variantArgs = [] as any[];
    variantData.forEach((data, idx) => {
      const args = {
        report: {
          url: `${reportUrl}&id=GridPrint${idx + 1}`,
          method: 'GET',
        },
        data,
        type: 'preview',
        reportMethod: '',
        dataMethod: '',
        dataUrlParams: '',
      };
      variantArgs.push(args);
    });
    webappAjaxRun(variantArgs);
  } else {
    const variantArgs = {
      report: {
        url: `${reportUrl}`,
        method: 'GET',
      },
      data: variantData,
      type: 'preview',
      reportMethod: '',
      dataMethod: '',
      dataUrlParams: '',
    };
    webappAjaxRun(variantArgs);
  }
};
