import store from "@/store"
import { COLORS } from "@/utils/enums"
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'

export default class Button extends RexUIPlugin.UI.Buttons {
    constructor(scene, config) {
        super(scene, config)

        this.defaultConfig = {
            x: 0,
            y: 0,
            width: 60,
            height: 60,
            align: 'center',
            space: {
                left: 10,
                right: 10,
            },
            background: RexUIPlugin.add.roundRectangle(0, 0, 0, 0, 10, COLORS["fc-yellow"])
        }
        this.processConfig()
    }

    processConfig() {
        const { scene, config } = this.props

        if (!config) {
            this.config = this.defaultConfig
        } else {
            this.config = { ...this.props.config, ...this.defaultConfig}

            if (this.props.config['watch']) {
                console.log('watcher:');
            }
        }

        scene.add.existing(this)
    }
}