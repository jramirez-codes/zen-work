---
title: Audio Equalizer
tags: [EE, Circuts, Design]
date: 2019-11-11T05:25:44.226Z
path: portfolio/Audio-Equalizer
cover: ./image2.png
excerpt: Designing and building an audio equalizer
currData: "## Inital Design\n
[] AudioEqual/initaldesign.png\n
The initial design has low pass circuit is on the top left, right after the potentiometer. The band pass circuit is in the middle path on the left side, right after the potentiometer. The high pass circuit is in on the bottom left right after the potentiometer. This design had 4 different potentiometers to 3 for adjustable equalizer and 1 for volume control. For example, the potentiometer at R17 and R18 controls how much voltage goes to the low pass circuit, controlling the base filter. In addition, there are 3 inverting amplifiers for each of the filter, which control voltage gain. The last amplifier, on the middle right of the circuit, is a summing Op-amp. This Op-amp uses the resistance from the other filters in order to get a voltage gain. In total this circuit is packed with an equalizer sub system for base, mid, treble, and an audio amplifier.\n
[] AudioEqual/image2.png\n
Changes Made:\n
* Moved the potentiometer to the output of the inverting amplifier to control the different filters\n
* Added buffers to the before and after the filters to protect the circuit.\n
"

---