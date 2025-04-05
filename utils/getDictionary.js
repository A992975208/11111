import http from '@/api/httpload'

const dictionaryCache = new Map();
/**
 * 根据字典类型和字典值获取对应的 value 或 label
 * @param {string} type 字典类型
 * @param {string} key 字典的值，可选
 * @param {string} field 返回字段，可选，默认是 value，可选择 label
 * @returns {Promise<string|Array>} 如果传入 key 和 field，返回对应的 value 或 label；否则返回整个字典数组
 */
export const getDictionary = async (type, key = '', field = 'value') => {
    // 检查缓存中是否已有该字典数据
    if (dictionaryCache.has(type)) {
        const cachedData = dictionaryCache.get(type);
        return key ? extractValue(cachedData, key, field) : cachedData;
    }
        // 发起请求获取字典数据
      const response =   await http.get(`/sys/dict/dictItems/${type}`)
        if (response.result?.length > 0) {
            const dictionary = response.result || [];
            // 缓存字典数据
            dictionaryCache.set(type, dictionary);
            // 返回指定 key 的值或整个字典数组
            return key ? extractValue(dictionary, key, field) : dictionary;
        } else {
            console.error('获取数据字典失败', response.message || '无数据');
            return key ? '' : [];
        }

};

/**
 * 从字典中提取指定值
 * @param {Array} dictionary 字典数组
 * @param {string} key 字典的值
 * @param {string} field 返回字段
 * @returns {string} 对应的 value 或 label
 */
const extractValue = (dictionary, key, field) => {
    const item = dictionary.find((d) => d.value == key || d.label === key);
    return item ? item[field] : '';
};
