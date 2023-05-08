
<script lang="tsx">
import { defineComponent, getCurrentInstance, h } from 'vue'
import { useClipboard } from '@vueuse/core'



const icons: Array<{ [key: string]: string }> = [
    {
        name: 'bn-icon-eye-open',
        componentName: 'bnIconEyeOpen',
    },
    {
        name: 'bn-icon-eye-close',
        componentName: 'bnIconEyeClose',
    },
    {
        name: 'bn-icon-plus',
        componentName: 'bnIconPlus',
    },
    {
        name: 'bn-icon-search',
        componentName: 'bnIconSearch',
    },
    {
        name: 'bn-icon-time',
        componentName: 'bnIconTime',
    },
    
]

export default defineComponent({
    setup() {
        const instance = getCurrentInstance()
        const info = instance?.appContext.config.globalProperties.message.info
        const component = instance?.appContext.components || {}

        const handleCopy = async (name) => {
            
            const content = '<' + name + ' />'
            const { copy, isSupported } = useClipboard({

                source: decodeURIComponent(content)
            })
            if (isSupported) {
                await copy()
                info('复制成功 ' + content)
            }
        }
        return () => h('div',
            { class: 'icon-wrapper' },
            icons.map(icon => h('div',
                { class: 'icon-item', onClick: () => handleCopy(icon.name) },
                [
                    h(component[icon.componentName], { class: 'icon', style: icon.style }),
                    h('div', { class: 'icon-name' }, icon.name)
                ]
            )))
    }
})
</script>

<style lang="scss">
.icon-wrapper {
    display: flex;
    flex-wrap: wrap;

    .icon-item {
        position: relative;
        border: 1px solid #ddd;
        width: 25%;
        height: 140px;
        text-align: center;
        margin-left: -1px;
        margin-top: -1px;
        cursor: pointer;
        transition: all 0.3s ease;
        line-height: 140px;

        &:hover {
            background-color: #f2f3f5;

            .icon {
                transform: scale(1.2);
            }
        }

        .icon {
            font-size: 32px;
            transition: all 0.3s ease;

        }

        .icon-name {
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0;
            padding: 12px;
            overflow: hidden;
            color: var(--color-text-1);
            font-size: 12px;
            white-space: nowrap;
            text-align: center;
            text-overflow: ellipsis;
            line-height: initial;
        }
    }


}
</style>

