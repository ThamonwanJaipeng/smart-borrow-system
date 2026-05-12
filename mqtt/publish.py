import paho.mqtt.publish as publish

publish.single(
    "home/face",
    "Thamonwan",
    hostname="192.168.1.100"
)

publish.single(
    "home/item",
    "Notebook",
    hostname="192.168.1.100"
)