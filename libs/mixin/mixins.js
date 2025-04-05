module.exports = {
    data() {
        return {

        }
    },
    onLoad() {
    },
    methods: {
        // 商品类型
        categoryType(courseLevel) {
            let value = '';
            switch (courseLevel) {
                case 0:
                    value = '免费体验课'
                    break;
                case 1:
                    value = '系统提升课';
                    break;
                case 2:
                    value = '七天见效课';
                    break;
                case 3:
                    value = '心理咨询课';
                    break;
                case 4:
                    value = '分类四';
                    break;
            }
            return value;
        },
        //订单状态
        orderStatus(orderStatus) {
            let value = '';
            switch (orderStatus) {
                case 0:
                    value = '待支付';
                    break;
                case 1:
                    value = '已支付';
                    break;
                case 2:
                    value = '已取消';
                    break;
            }
            return value;
        },
        //根据文字返回不同颜色值
        colorText(text) {
            let bgClass = '';
            switch (text) {
                case '育儿早教':
                    bgClass = 'tn-bg-blue';
                    break;
                case '兴趣培养':
                    bgClass = 'tn-bg-red';
                    break;
                case '学科提升':
                    bgClass = 'tn-bg-orange';
                    break;
                case '焦虑抑郁':
                    bgClass = 'tn-bg-purple';
                    break;
                case '脾气暴躁':
                    bgClass = 'tn-bg-cyan';
                    break;
                case '拒绝沟通':
                    bgClass = 'tn-bg-indigo';
                    break;
                case '沉迷网络':
                    bgClass = 'tn-bg-purplered';
                    break;
                case '叛逆厌学':
                    bgClass = 'tn-bg-aquablue';
                    break;
            }
            return bgClass;
        },
        // 数字转换万字
        courseNum(val) {
            let num = 10000
            var sizesValue = ''
            /**
             * 判断取哪个单位
             */
            if (val < 1000) {
                // 如果小于1000则直接返回
                sizesValue = ''
                return val;
            } else if (val > 1000 && val < 9999) {
                sizesValue = '千'
            } else if (val > 10000 && val < 99999999) {
                sizesValue = '万'
            } else if (val > 100000000) {
                sizesValue = '亿'
            }
            /**
             * 大于一万则运行下方计算
             */
            let i = Math.floor(Math.log(val) / Math.log(num))
            /**
             * toFixed(0)看你们后面想要取值多少，我是不取所以填了0，一般都是取2个值
             */
            var sizes = ((val / Math.pow(num, i))).toFixed(0)
            sizes = sizes + sizesValue
            return sizes;
        },
        // 计算剩余可视区域的高度
        getContentHeight(Headersearch, Tabs) {
            let searchHeight = 0;
            let tabsHeight = 0;
            let swiperHeight = 0;
            // 获取header-serach高度
            if (Headersearch) {
                let headersearch = uni.createSelectorQuery().select(Headersearch)
                headersearch.boundingClientRect(data => {
                    searchHeight = data.height;
                }).exec()
            }
            //  获取tabs高度
            if (Tabs) {
                let tabs = uni.createSelectorQuery().select(Tabs)
                tabs.boundingClientRect(data => {
                    tabsHeight = data.height;
                }).exec()
            }
            uni.getSystemInfo({
                success(res) {
                    swiperHeight = res.windowHeight - searchHeight - tabsHeight;
                }
            })
            return swiperHeight;
        },
        //手机号334
        formatPhone(phone) {
            if (!phone) return "";
            return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
        },
        // 时间转换为“几分钟前”、“几小时前”等
        formatRelativeTime(dateString) {
            if (!dateString || typeof dateString !== 'string') {
                return '时间格式无效'; // 防止 undefined 或非字符串
            }
            const now = new Date(); // 当前时间
            const pastTime = new Date(dateString.replace(/-/g, '/')); // 替换 - 为 /
            if (isNaN(pastTime.getTime())) {
                return '无效的时间格式'; // 日期字符串无效
            }
            const diff = now - pastTime; // 时间差（毫秒）

            if (diff < 60000) { // 小于1分钟
                return '刚刚';
            } else if (diff < 3600000) { // 小于1小时
                const minutes = Math.floor(diff / 60000);
                return `${minutes}分钟前`;
            } else if (diff < 86400000) { // 小于1天
                const hours = Math.floor(diff / 3600000);
                return `${hours}小时前`;
            } else if (diff < 2592000000) { // 小于30天
                const days = Math.floor(diff / 86400000);
                return `${days}天前`;
            } else if (diff < 31536000000) { // 小于1年
                const months = Math.floor(diff / 2592000000);
                return `${months}个月前`;
            } else { // 大于1年
                const years = Math.floor(diff / 31536000000);
                return `${years}年前`;
            }
        }
    }
}
