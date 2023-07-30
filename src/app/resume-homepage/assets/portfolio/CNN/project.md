---
title: "Convolution Neural Network: CIFAR dataset"
path: portfolio/CNN
tags: [Python, MachineLearning, CNN, MachineVision]
cover: ./CNN.png
date: 2020-10-15
excerpt: Convolution Neural Network observations with the CIFAR Images dateset.
currData: "## Objective:\n
To test differnt convolution neural network configurations with CIFAR images.\n
## Test One:\n
In the initial test, the convolution neural network uses CIFAR images. Importing the images into google colab, the CIFAR10 data set has 60,000 color images in 10 classes. Each class is exclusive with no overlap between them.\n

In this convolution neural network, the architecture has an input shape of (32, 32, 3), with 3 convolution layers with the 32, 64, and 64 channels. Also, the convolution neural network has a 2 dense layer with a size of 64 and 10. The dense layer will unroll the 3D output to 1D. With each convolutional layer, the neural network used relu activation. Looking at the convolution layers output before the dense layer the model had a total of 56,320 trainable weights.\n

[] CNN/baseLayer.png)\n

After the convolutional layers, the model output then goes into the dense layer, where the 3D output in then shifted to a 1D output. After the dense layer, the total trainable weights are 122,570.\n

[] CNN/baseLayer2.png\n

Training the convolution neural network, the neural network showed vast improvement throughout each epoch. Initially, at the first epoch, the validation accuracy of the neural network was 0.5301. By the end of the 10th epoch, the model was able to generate a validation accuracy of 0.7167. The total test accuracy was at 0.7167.\n

[] CNN/graph.png\n

## Test Two: Enlarging Existing Layers\n
In the second test, the existing layers of the convolution neural network were enlarged and kept the same inputs as the initial test. For the convolution neural network architecture, I increased each convolution layer from 32, 64, 64 channels to 64, 128, 128 channels. In this new convolution neural network before the dense layer, the total trainable weights are 223,232.\n

[] CNN/test2Base.png\n

Taking the output after the convolution layers and place them into the dense layer the number of total weights increased to 355,018.\n

[] CNN/test2Base2.png\n

Training the convolution neural network, at the first epoch the validation accuracy was at 0.5798. After the 10th epoch, the validation accuracy increased to 0.7186. The test accuracy was0.7186. The highest validation accuracy was at epoch 5 and then hovered around 0.719 from there. Comparing the initial test to the second test where the convolution layers were doubled, the neural network showed little improvement. The initial test accuracy was at 0.7167, while the second test accuracy was at 0.7186. Increased the size of the convolution layers may have overfitted the neural network since there wasn't constant improvement throughout each epoch.\n

[] CNN/graph2.png\n

## Test Three: Adding More Convolution Layers\n
In the third test using the same input data from the initial test, but instead of using 3 convolution layers, the third test will have 5 convolution layers. The architecture for the convolution layers 32, 64, 64, 64, 64 channels and two dense layers of 64 and 10. After inputting the data through the convolution layers the neural network had a total of 130,176 trainable weights.\n

[] CNN/test3Img1.png\n

Taking the output from the convolution layer and placing it into the dense layers, the total trainable weights, jumps up to 462,66.\n

[] CNN/test3Img2.png\n

Training the convolution neural network, at the first epoch the validation accuracy was at 0.5618. After the 10th epoch, the validation accuracy jumped up to 0.7136. Looking at the graph for epoch vs. accuracy, the validation accuracy seemed to hover at 0.72 starting at the 5th epoch. There was mostly an increase in accuracy throughout each epoch. Since the validation accuracy hovered around 0.715 after epoch 5, one can say that this neural network is slightly overfitted. Comparing the third test with the initial test, the test accuracy decreased. The third test had a test accuracy of 0.7136, while the initial test had a test accuracy of 0.7167. The initial test had a higher test accuracy, adding two more convolution layers may have overfitted the neural network.\n

[] CNN/test3Img3.png\n

## Results\n
Training and testing a convolution neural network using the CIFAR image data set the initial test had a test accuracy of 0.7167. Looking at the second test, where the convolution layer channels were doubled the neural network had a test accuracy of 0.7186, which did show improvement from the initial test. The second test’s validation accuracy was higher than the initial test, but there wasn’t a vast improvement. Looking at the Epoch vs. Accuracy graph for the second test, the validation accuracy peeked at the 5th epoch and then hovered around 0.715. After the 5th epoch, the convolution neural network was mostly trained after the 10th epoch the neural network may have become overfitted. In the third test, the convolution neural network was changed to have 5 convolution layers instead of 3. The test accuracy for the third test was at 0.7136. The third test validation accuracy was slightly lower than the initial test, which shows no improvement from the initial test. In the third test at epochs 5 to 10, the validation accuracy hovered around 0.72 and didn’t improve, one could say that the convolution neural network was slightly overfitted."

---