import dayjs from 'dayjs';
import { previewPrint } from '@/utils/grid-report/grwebapp';

function shortDi(pkgCode) {
  if (!pkgCode) {
    return '';
  }
  let diStr;
  if (pkgCode.startsWith('01')) {
    diStr = pkgCode.substring(0, 16);
    return `(01)${diStr.substring(2)}`;
  } else {
    diStr = pkgCode.substring(0, 14);
    return `(01)${diStr}`;
  }
}

function shortBatch(batchCode) {
  return batchCode ? `(10)${batchCode}` : '';
}

function shortDate(type, date) {
  if (!date) {
    return '';
  }
  const month = dayjs(date).month() + 1;
  let monthString;
  if (month < 10) {
    monthString = `0${month}`;
  } else {
    monthString = month.toString();
  }
  const day = dayjs(date).day();
  let dayString;
  if (day < 10) {
    dayString = `0${day}`;
  } else {
    dayString = day.toString();
  }
  const prefix = type == 1 ? '(11)' : '(17)';
  return prefix + dayjs(date).year().toString().substring(2) + monthString + dayString;
}

/**
 * 打印UDI二维码
 *
 * @param printList 后端请求PrintInfoVO集合
 * @param hosId 医院ID
 */
function printUdiInfo(printList, hosId) {
  const previewList = printList.map((item) => {
    return prepareUdiInfo(item);
  });
  const reportData = { Detail: previewList };
  previewPrint('pkg_info', hosId, reportData);
}

function prepareUdiInfo(item) {
  let res = { ...item };
  res.pkgSscc = item.ssccCode;
  res.pkgName = item.barName;
  res.expdtEndDate = item.expdtDate;
  res.fillDate = item.createTime;
  if (item.ext && item.ext.purBillId) {
    res.purBillId = item.ext.purBillId;
  } else if (res.extInfo && res.extInfo.length > 0) {
    const jsonObj = JSON.parse(res.extInfo);
    if (jsonObj.purBillId) {
      res.purBillId = jsonObj.purBillId;
    }
  }
  if (res.taskDate == null) {
    res.taskDate = item.createTime.substring(0, 10);
  }
  if (res.barCodeMng == null) {
    res.barCodeMng = 2; // 默认打印UDI
  }
  res.qrCode = item.pkgCode;
  res.qrCodeSee = item.pkgCodeSee;
  res.di = shortDi(item.pkgCode);
  res.udiBatchCode = shortBatch(item.batchCode);
  res.udiProductDate = shortDate(1, item.productDate);
  res.udiExpdtDate = shortDate(2, item.expdtDate);
  res.udiSerialNo = `(21)${item.snCode}`;
  return res;
}

function printHighInfo(printList, hosId) {
  const previewList = printList.map((item) => {
    return prepareUdiInfo(item);
  });
  const reportData = { Detail: previewList };
  previewPrint('high_info', hosId, reportData);
}

function printFillInfo(printList, hosId) {
  const previewList = printList.map((item) => {
    return prepareUdiInfo(item);
  });
  const reportData = { Detail: previewList };
  previewPrint('prov_fill_info', hosId, reportData);
}

export default {
  printUdiInfo,
  printHighInfo,
  printFillInfo,
};
