import {Message} from "ant-design-vue/types/message";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: Message;
  }
}
