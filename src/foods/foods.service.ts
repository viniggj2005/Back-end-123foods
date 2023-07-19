import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Foods } from './entities/foods.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodsHasImages } from "src/foods_has_images/entities/foods_has_image.entity";
import { Images } from "src/images/entities/images.entity";
import { CreateImageDto } from "src/images/dto/create-image.dto";

@Injectable()

export class FoodsService {
  constructor(
    @InjectRepository(Foods)
    private foodRepository: Repository<Foods>,
    @InjectRepository(FoodsHasImages)
    private foodsHasImageRepository: Repository<FoodsHasImages>,
    @InjectRepository(Images)
    private imageRepository: Repository<Images>
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Foods> {
    const food = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(food);
  }

  async createImage(path: string): Promise<Images> {
    const newImage = new Images();
    newImage.path = path

    return this.imageRepository.save(newImage)
  }

  async createFoodsHasImages(foodId, imageId): Promise<FoodsHasImages> {
    const newFoodsHasImage = new FoodsHasImages();
    newFoodsHasImage.food = foodId
    newFoodsHasImage.image = imageId

    return this.foodsHasImageRepository.save(newFoodsHasImage)
  }

  async priceAll( minPrice: number, maxPrice: number): Promise<Foods[]> {
    return this.foodRepository.find({
      where: {
        price: Between(minPrice, maxPrice)
      }
    });
  }
  async search(filterValue: string): Promise<Foods[]> {
    return this.foodRepository.find({
      where: [
        { name: ILike(`%${filterValue}%`) },
        { description: ILike(`%${filterValue}%`) },
        { category: ILike(`%${filterValue}%`) },
        { brand: ILike(`%${filterValue}%`) },
      ],
    });
  }

  
  async filterAll(filterType: string, filterValue: string): Promise<Foods[]> {
    return this.foodRepository.find({ where: { [filterType]: ILike(`%${filterValue}%`) } });
  }

  async findAll(): Promise<Foods[]> {
    return this.foodRepository.find();
  }

  async findOne(id: number): Promise<Foods> {
    return this.foodRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Foods> {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    food.name = updateFoodDto.name;
    food.brand = updateFoodDto.brand;
    food.weight = updateFoodDto.weight;
    food.unit_of_measurement = updateFoodDto.unit_of_measurement;
    food.category = updateFoodDto.category;
    food.amount = updateFoodDto.amount;
    food.description = updateFoodDto.description;
    food.price = updateFoodDto.price;
    // food.images = updateFoodDto.images;

    const updatedFood = await this.foodRepository.save(food);
  
    return updatedFood;
  }

  async remove(id: number): Promise<void> {
    const result = await this.foodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Food not found');
    }
  }
}
