export default {
    courseType(courseLevel) {
        let value = '';
        switch (courseLevel) {
            case 0:
                value = '免费体验课'
                break;
            case 1:
                value = '精品专题课';
                break;
            case 2:
                value = '系统提升课';
                break;
            case 3:
                value = '分类四';
                break;
            case 4:
                value = '分类五';
                break;
        }
        return value;
    },
}
