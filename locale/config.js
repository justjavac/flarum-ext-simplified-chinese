moment.locale('zh', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1 月_2月_3 月_4 月_5 月_6 月_7 月_8 月_9 月_10 月_11 月_12 月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'M 月 D 日',
    LL: 'YYYY 年 M 月 DD 日',
    LLL: 'YYYY-MM-DD HH:mm',
    LLLL: 'YYYY-MM-DD HH:mm:ss',
    l: 'M/D',
    ll: 'YY/M/D',
    lll: 'YYYY-MM-DD HH:mm',
    llll: 'YYYY-MM-DD HH:mm:ss'
  },
  calendar: {
    sameDay: function () {
      return this.minutes() === 0 ? '[今天] h [时整]' : '[今天] LT';
    },
    nextDay: function () {
      return this.minutes() === 0 ? '[明天] h [时整]' : '[明天] LT';
    },
    lastDay: function () {
      return this.minutes() === 0 ? '[昨天] h [时整]' : '[昨天] LT';
    },
    nextWeek: function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]';
      return this.minutes() === 0 ? prefix + 'ddd h 时整' : prefix + 'ddd h 时 mm';
    },
    lastWeek: function () {
      var startOfWeek, prefix;
      startOfWeek = moment().startOf('week');
      prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
      return this.minutes() === 0 ? prefix + 'ddd h 时整' : prefix + 'ddd h 时 mm';
    },
    sameElse: 'LL'
  },
  ordinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日';
      case 'M':
        return number + '月';
      case 'w':
      case 'W':
        return number + '周';
      default:
        return number;
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 0, // Sunday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
});
